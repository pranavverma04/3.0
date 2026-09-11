/*!
 * A.T.O.M Reel — a cinematic photo transition widget.
 *
 * No dependencies, no build step. Drop the three files on any web host:
 *
 *   <link rel="stylesheet" href="atom-reel.css">
 *   <div data-atom-reel></div>
 *   <script src="atom-reel.js"></script>
 *
 * Everything you are likely to change lives in SLIDES and CONFIG below.
 */
;(function () {
  'use strict'

  /* ================================================================
     1. YOUR PHOTOS — edit this list
     ================================================================
     `photo` is the path without the size suffix or extension, so
     "/atom-reel/photos/club-stage" resolves to /atom-reel/photos/club-stage-2200.webp and
     friends. Each photo needs -900, -1600 and -2200 in .webp and .jpg.

     `mode` picks the transition played on the way OUT of that photo:
       0 = liquid     1 = shatter    2 = shockwave
       3 = ember      4 = iris       5 = blinds
       6 = card       7 = doors      8 = whip
     With CONFIG.cycleEffects on (the default) these are only a starting
     point — every loop shifts the whole set forward, so somebody who
     watches twice never sees the same sequence of cuts.
  */
  var SLIDES = [
    {
      photo: '/atom-reel/photos/club-stage',
      kicker: 'The club',
      title: 'A.T.O.M Robotics',
      line: 'The full club together on stage.',
      tag: 'The club',
      alt: 'The full A.T.O.M Robotics club gathered on stage under a lit atom logo.',
      mode: 0,
    },
    {
      photo: '/atom-reel/photos/build-squad',
      kicker: 'The team',
      title: 'The Build Squad',
      line: 'The core team with their robots, on demo day.',
      tag: 'Build team',
      alt: 'Eight robotics club members seated on steps behind their robots and a drone.',
      mode: 1,
    },
    {
      photo: '/atom-reel/photos/showcase-table',
      kicker: 'Demo day',
      title: 'The Showcase Table',
      line: 'Walking visitors through a build at the showcase.',
      tag: 'Showcase',
      alt: 'A student demonstrating a robot on a table, surrounded by a crowd of visitors.',
      mode: 2,
    },
    {
      photo: '/atom-reel/photos/campus-session',
      kicker: 'Event',
      title: 'Campus Session',
      line: 'A full-house auditorium session on robotics.',
      tag: 'Event',
      alt: 'A packed campus auditorium during a robotics talk, with a presentation slide on the stage screen.',
      mode: 3,
    },
    {
      photo: '/atom-reel/photos/launch-day',
      kicker: 'Launch day',
      title: 'Launch Day',
      line: 'The club celebrating together on campus.',
      tag: 'Campus',
      alt: 'Robotics club members holding up a large event banner outdoors.',
      mode: 4,
    },
  ]

  /* ================================================================
     2. TIMING AND LABELS — edit to taste
     ================================================================ */
  var CONFIG = {
    /* 'auto' plays on a clock, like a video — the smoothest option and the
       default. 'scroll' pins the reel and drives it from the page scroll. */
    mode: 'auto',
    /* Milliseconds a photo rests before the next cut begins. */
    holdMs: 2500,
    /* Milliseconds a cut takes. Longer = slower, more languid. */
    cutMs: 1350,
    /* Shift the whole transition set forward on every loop, so all nine
       effects get shown rather than the same five over and over. */
    cycleEffects: true,
    /* Top-left caption on the frame. */
    label: 'A.T.O.M Robotics',
    sublabel: 'Campus robotics club',
    /* 0 disables every effect flourish, 1 is full strength. */
    intensity: 1,
  }

  /* ================================================================
     Everything below is the engine.
     ================================================================ */

  var VERT =
    'attribute vec2 aPos;varying vec2 vUv;' +
    'void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}'

  var FRAG = [
    'precision highp float;',
    'varying vec2 vUv;',
    'uniform sampler2D uFrom;uniform sampler2D uTo;',
    'uniform vec2 uRes;uniform vec2 uMouse;',
    'uniform float uFromRatio,uToRatio,uProgress,uMode,uTime;',
    'uniform float uKenFrom,uKenTo,uIntensity,uDpr,uReveal;',
    'const float PI=3.14159265359;',

    'float hash21(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}',

    'float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);',
    'float a=hash21(i),b=hash21(i+vec2(1.0,0.0)),c=hash21(i+vec2(0.0,1.0)),d=hash21(i+vec2(1.0,1.0));',
    'return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}',

    'float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<3;i++){v+=a*vnoise(p);p*=2.03;a*=0.5;}return v;}',

    /* object-fit: cover, with a zoom and drift around the centre */
    'vec2 coverUV(vec2 uv,float ratio,float zoom,vec2 drift){',
    'float cr=uRes.x/uRes.y;vec2 s=cr>ratio?vec2(1.0,ratio/cr):vec2(cr/ratio,1.0);',
    'return (uv-0.5)*s/zoom+0.5+drift;}',

    /* red and blue pulled apart radially, plus an optional directional
       smear used by the whip pan. `sm` comes from uniforms only, so the
       branch is uniform across the quad and the sampling stays valid. */
    'vec3 sampleTex(sampler2D tex,vec2 uv,float ca,vec2 sm){',
    'vec2 o=(uv-0.5)*ca;',
    'vec3 c=vec3(texture2D(tex,clamp(uv+o,0.0015,0.9985)).r,',
    'texture2D(tex,clamp(uv,0.0015,0.9985)).g,',
    'texture2D(tex,clamp(uv-o,0.0015,0.9985)).b);',
    'if(dot(sm,sm)>0.0){c=(c+texture2D(tex,clamp(uv+sm,0.0015,0.9985)).rgb',
    '+texture2D(tex,clamp(uv-sm,0.0015,0.9985)).rgb)*0.3333;}',
    'return c;}',

    'void main(){',
    'float cr=uRes.x/uRes.y;float p=clamp(uProgress,0.0,1.0);float I=uIntensity;vec2 uv=vUv;',

    /* the pointer behaves like a soft lens held against the frame */
    'vec2 m=uMouse*0.5+0.5;vec2 toM=(uv-m)*vec2(cr,1.0);float md=length(toM);',
    'vec2 ld=md>0.0001?toM/md:vec2(0.0);',
    'uv+=ld*exp(-md*7.0)*0.014*I*(0.65+0.35*sin(uTime*1.7-md*15.0));',
    'uv+=uMouse*vec2(0.011,0.008)*I;',

    'float crest=sin(PI*p);float crest2=pow(crest,1.5);',
    'vec2 fromUV=uv,toUV=uv;float mask=p;vec3 burn=vec3(0.0);',
    'float darken=1.0;vec2 smear=vec2(0.0);',
    'int mode=int(uMode+0.5);',

    'if(p>0.0005&&p<0.9995){',

    /* 0 — liquid: the frames swim past each other through flow noise */
    'if(mode==0){',
    'float n=fbm(uv*2.6+vec2(uTime*0.05,-uTime*0.04));',
    'float n2=fbm(uv*4.4-vec2(uTime*0.03,uTime*0.02));',
    'vec2 dir=vec2(cos(n*6.2831),sin(n2*6.2831));',
    'fromUV+=dir*crest2*0.075*(0.35+n);toUV-=dir*crest2*0.075*(0.35+n2);',
    'float thr=n*0.55;mask=smoothstep(thr,thr+0.5,p*1.42);',
    'burn=vec3(0.30,0.72,1.0)*smoothstep(0.18,0.0,abs(p*1.42-thr-0.25))*crest*0.24;',

    /* 1 — shatter: horizontal slices tear apart, then snap back */
    '}else if(mode==1){',
    'float row=floor(uv.y*24.0);',
    'float r=hash21(vec2(row,7.31));float r2=hash21(vec2(row,19.77));',
    'float ds=r<0.5?-1.0:1.0;',
    'fromUV.x+=ds*crest2*(0.10+r*0.46)*p;toUV.x-=ds*crest2*(0.10+r2*0.46)*(1.0-p);',
    'float thr=r*0.44;mask=smoothstep(thr,thr+0.22,p*1.52);',
    'vec2 cell=floor(uv*vec2(56.0*cr,32.0));',
    'float blk=step(0.91,hash21(cell+floor(uTime*9.0)));',
    'burn=vec3(0.25,0.92,1.0)*blk*crest2*crest2*0.5;',

    /* 2 — shockwave: a ring blows out of the centre and drags the pixels */
    '}else if(mode==2){',
    'vec2 c=vec2(0.5)+uMouse*0.07;vec2 rv=(uv-c)*vec2(cr,1.0);',
    'float r=length(rv);vec2 rd=r>0.0001?rv/r:vec2(0.0);float R=p*1.55-0.2;',
    'float ring=sin(r*15.0-p*17.0)*exp(-r*2.2)*crest;',
    'fromUV+=rd*ring*0.10;toUV+=rd*ring*0.05;',
    'mask=1.0-smoothstep(R-0.17,R+0.17,r);',
    'burn=vec3(0.40,0.78,1.0)*smoothstep(0.11,0.0,abs(r-R))*crest*0.85;',

    /* 3 — ember: the outgoing frame burns away cell by cell */
    '}else if(mode==3){',
    'vec2 cell=floor(uv*vec2(112.0*cr,66.0));float r=hash21(cell);',
    'float thr=r*0.72+fbm(uv*3.0)*0.28;mask=smoothstep(thr,thr+0.10,p*1.14);',
    'fromUV=(fromUV-0.5)/(1.0+crest*0.07)+0.5;toUV=(toUV-0.5)*(1.0+crest*0.05)+0.5;',
    'burn=mix(vec3(1.0,0.48,0.10),vec3(0.30,0.70,1.0),r*0.7)',
    '*smoothstep(0.07,0.0,abs(p*1.14-thr))*0.95;',

    /* 4 — iris: a six-blade camera shutter closes on one photo, opens on the next */
    '}else if(mode==4){',
    'float ap=abs(p*2.0-1.0);',
    'vec2 q=(uv-0.5)*vec2(cr,1.0);',
    'float ang=atan(q.y,q.x)+p*1.15;',
    'float seg=6.2831853/6.0;',
    'float d=length(q)*cos(floor(0.5+ang/seg)*seg-ang);',
    'float R=0.055+ap*1.13;',
    'float inside=smoothstep(R+0.012,R-0.012,d);',
    'darken=inside;mask=step(0.5,p);',
    'float z=1.0+(1.0-ap)*0.13;',
    'fromUV=(fromUV-0.5)/z+0.5;toUV=(toUV-0.5)/z+0.5;',
    'burn=vec3(1.0,0.74,0.38)*smoothstep(0.028,0.0,abs(d-R))*0.95;',

    /* 5 — blinds: nine slats close top-first and reveal the next photo */
    '}else if(mode==5){',
    'float slats=9.0;float sy=fract(uv.y*slats);float row=floor(uv.y*slats);',
    'float pp=smoothstep(0.0,1.0,clamp((p-(row/slats)*0.3)/0.7,0.0,1.0));',
    'float edge=1.0-pp;',
    'mask=smoothstep(edge-0.012,edge+0.012,sy);',
    'darken=1.0-(1.0-mask)*pp*0.42*(1.0-sy);',
    'fromUV.y+=(1.0-mask)*pp*0.018;',
    'burn=vec3(0.35,0.80,1.0)*smoothstep(0.016,0.0,abs(sy-edge))*pp*0.7;',

    /* 6 — card: the photo shrinks into a framed card and drops away */
    '}else if(mode==6){',
    'float k=smoothstep(0.0,0.88,p);float sc=mix(1.0,0.34,k);',
    'fromUV=(uv-0.5)/sc+0.5;',
    'toUV=(uv-0.5)/mix(1.18,1.0,smoothstep(0.05,1.0,p))+0.5;',
    'vec2 dd=abs(uv-0.5)-vec2(0.5*sc);float box=max(dd.x,dd.y);',
    'float inCard=smoothstep(0.0018,-0.0018,box);',
    'float fade=1.0-smoothstep(0.78,1.0,p);',
    'mask=1.0-inCard*fade;',
    'darken=1.0-(1.0-inCard)*smoothstep(0.055,0.0,box)*0.4*fade;',
    'burn=vec3(0.55,0.86,1.0)*smoothstep(0.005,0.0,abs(box))*fade*0.85;',

    /* 7 — doors: the frame parts down the middle and slides away */
    '}else if(mode==7){',
    'float k=smoothstep(0.0,1.0,p);float slide=k*0.56;',
    'float side=uv.x<0.5?1.0:-1.0;',
    'fromUV.x=uv.x+side*slide;',
    'float le=0.5-slide;float re=0.5+slide;',
    'mask=smoothstep(le-0.004,le+0.004,uv.x)*(1.0-smoothstep(re-0.004,re+0.004,uv.x));',
    'toUV=(uv-0.5)/mix(1.12,1.0,k)+0.5;',
    'burn=vec3(0.40,0.85,1.0)*(smoothstep(0.006,0.0,abs(uv.x-le))',
    '+smoothstep(0.006,0.0,abs(uv.x-re)))*0.8;',

    /* 8 — whip: a hard pan that smears, cutting at the peak of the blur */
    '}else{',
    'float k=smoothstep(0.0,1.0,p);vec2 wd=vec2(0.9988,0.05);',
    'fromUV+=wd*k*0.42;toUV+=wd*(k-1.0)*0.42;',
    'mask=smoothstep(0.46,0.54,p);',
    'smear=wd*crest*0.05;',
    'burn=vec3(0.45,0.78,1.0)*crest2*0.05;',
    '}}',

    /* Ken Burns: a slow push plus a slower breath, so nothing sits still */
    'float breath=sin(uTime*0.25)*0.012;',
    'float zf=1.10+0.085*uKenFrom+breath;float zt=1.10+0.085*uKenTo+breath;',
    'vec2 df=vec2(sin(uKenFrom*1.7+0.4),cos(uKenFrom*1.3))*0.011;',
    'vec2 dt=vec2(sin(uKenTo*1.7+0.4),cos(uKenTo*1.3))*0.011;',

    'float ca=(0.0018+crest*0.005)*I;',
    'vec3 a=sampleTex(uFrom,coverUV(fromUV,uFromRatio,zf,df),ca,smear);',
    'vec3 col=a;',
    'if(p>0.0005){vec3 b=sampleTex(uTo,coverUV(toUV,uToRatio,zt,dt),ca,smear);',
    'col=mix(a,b,clamp(mask,0.0,1.0));}',
    'col*=darken;',
    'col+=burn*I;',

    /* grade: lift saturation, cool the shadows, warm the highlights */
    'float lum=dot(col,vec3(0.299,0.587,0.114));',
    'col=mix(vec3(lum),col,1.14);',
    'col*=mix(vec3(0.96,0.98,1.07),vec3(1.05,1.01,0.98),smoothstep(0.22,0.85,lum));',
    'col+=smoothstep(0.70,1.0,lum)*vec3(0.13,0.18,0.28)*(0.55+0.45*I);',
    'col+=vec3(0.26,0.52,0.88)*pow(crest,5.0)*0.22*I;',

    /* a warm light leak sweeps across the frame on every cut */
    'col+=vec3(1.0,0.62,0.30)*smoothstep(0.32,0.0,abs(vUv.x-(p*1.6-0.3)))*crest*0.10*I;',

    /* vignette, scanlines, grain */
    'float vg=length((vUv-0.5)*vec2(cr,1.0));',
    'col*=smoothstep(1.18,0.30,vg)*0.36+0.64;',
    'col*=1.0-0.03*I*abs(sin(vUv.y*uRes.y/max(uDpr,1.0)*1.5708));',
    'col+=(hash21(vUv*uRes+fract(uTime)*vec2(127.0,311.0))-0.5)*0.042*I;',

    'gl_FragColor=vec4(max(col,0.0)*uReveal,1.0);}',
  ].join('\n')

  var UNIFORMS = [
    'uFrom', 'uTo', 'uRes', 'uFromRatio', 'uToRatio', 'uProgress', 'uMode',
    'uTime', 'uMouse', 'uKenFrom', 'uKenTo', 'uIntensity', 'uDpr', 'uReveal',
  ]

  function compile(gl, type, src) {
    var sh = gl.createShader(type)
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(sh)
      gl.deleteShader(sh)
      throw new Error('atom-reel: shader failed — ' + log)
    }
    return sh
  }

  /** Owns the GL context, the textures and the single draw call. */
  function Renderer(canvas) {
    var opts = {
      alpha: false, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: false, powerPreference: 'high-performance',
    }
    var gl = canvas.getContext('webgl2', opts) || canvas.getContext('webgl', opts)
    if (!gl) throw new Error('atom-reel: WebGL unavailable')

    this.gl = gl
    this.canvas = canvas
    this.slots = []
    this.dpr = 1
    this.isGL2 = typeof WebGL2RenderingContext !== 'undefined' &&
      gl instanceof WebGL2RenderingContext

    var vs = compile(gl, gl.VERTEX_SHADER, VERT)
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    var prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error('atom-reel: link failed — ' + gl.getProgramInfoLog(prog))
    }
    this.program = prog
    gl.useProgram(prog)

    var buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    var aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    this.buffer = buf

    this.u = {}
    for (var i = 0; i < UNIFORMS.length; i++) {
      this.u[UNIFORMS[i]] = gl.getUniformLocation(prog, UNIFORMS[i])
    }
    gl.uniform1i(this.u.uFrom, 0)
    gl.uniform1i(this.u.uTo, 1)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  }

  Renderer.prototype.maxTextureSize = function () {
    return this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE)
  }

  Renderer.prototype.setImage = function (index, image) {
    var gl = this.gl
    var tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    if (this.isGL2) {
      /* WebGL2 mipmaps non-power-of-two textures, which stops a 2200px
         photo shimmering when it is drawn smaller than native. */
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    }
    this.slots[index] = {
      tex: tex,
      ratio: image.naturalWidth / Math.max(image.naturalHeight, 1),
    }
  }

  /** Sizes the drawing buffer from a box the caller already measured. */
  Renderer.prototype.resize = function (cssW, cssH, dpr) {
    var w = Math.max(1, Math.round(cssW * dpr))
    var h = Math.max(1, Math.round(cssH * dpr))
    this.dpr = dpr
    if (this.canvas.width === w && this.canvas.height === h) return
    this.canvas.width = w
    this.canvas.height = h
    this.gl.viewport(0, 0, w, h)
  }

  Renderer.prototype.draw = function (f) {
    var gl = this.gl
    var from = this.slots[f.from]
    if (!from) return
    var to = this.slots[f.to] || from

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, from.tex)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, to.tex)

    var u = this.u
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height)
    gl.uniform1f(u.uFromRatio, from.ratio)
    gl.uniform1f(u.uToRatio, to.ratio)
    /* never dissolve towards a photo that has not arrived yet */
    gl.uniform1f(u.uProgress, this.slots[f.to] ? f.progress : 0)
    gl.uniform1f(u.uMode, f.mode)
    gl.uniform1f(u.uTime, f.time)
    gl.uniform2f(u.uMouse, f.mouse[0], f.mouse[1])
    gl.uniform1f(u.uKenFrom, f.kenFrom)
    gl.uniform1f(u.uKenTo, f.kenTo)
    gl.uniform1f(u.uIntensity, f.intensity)
    gl.uniform1f(u.uDpr, this.dpr)
    gl.uniform1f(u.uReveal, f.reveal)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  Renderer.prototype.dispose = function () {
    var gl = this.gl
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i]) gl.deleteTexture(this.slots[i].tex)
    }
    gl.deleteBuffer(this.buffer)
    gl.deleteProgram(this.program)
    var ext = gl.getExtension('WEBGL_lose_context')
    if (ext) ext.loseContext()
  }

  /* ---------------------------------------------------------------- */

  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v }
  var smoother = function (t) { return t * t * t * (t * (t * 6 - 15) + 10) }
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3) }

  function supportsWebP() {
    try {
      return document.createElement('canvas')
        .toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) { return false }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag)
    if (cls) n.className = cls
    if (text != null) n.textContent = text
    return n
  }

  /** Splits a title into per-word spans so each can rise on its own delay. */
  function kineticTitle(node, text) {
    node.textContent = ''
    /* the words are separate spans with no whitespace between them, so give
       assistive tech the clean string */
    node.setAttribute('aria-label', text)
    var words = text.split(' ')
    for (var i = 0; i < words.length; i++) {
      var clip = el('span', 'ar-clip')
      var word = el('span', 'ar-word', words[i])
      word.style.animationDelay = 45 + i * 45 + 'ms'
      clip.appendChild(word)
      node.appendChild(clip)
    }
  }

  /* ================================================================
     mount
     ================================================================ */
  function mount(root, options) {
    var cfg = {}
    var k
    for (k in CONFIG) cfg[k] = CONFIG[k]
    for (k in (options || {})) cfg[k] = options[k]
    if (root.dataset.mode) cfg.mode = root.dataset.mode
    if (root.dataset.hold) cfg.holdMs = +root.dataset.hold
    if (root.dataset.cut) cfg.cutMs = +root.dataset.cut
    if (root.dataset.cycle === 'false') cfg.cycleEffects = false

    var slides = cfg.slides || SLIDES
    var N = slides.length
    if (!N) return

    var reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ---- markup ---------------------------------------------------- */
    root.classList.add('ar-root')
    root.setAttribute('data-ar-mode', cfg.mode)
    root.style.setProperty('--ar-units', N)

    var stage = el('div', 'ar-stage')
    var frame = el('div', 'ar-frame')
    stage.appendChild(frame)
    root.appendChild(stage)

    var canvas = el('canvas', 'ar-canvas')
    canvas.setAttribute('role', 'img')
    canvas.setAttribute('aria-label', slides[0].alt || slides[0].title)
    frame.appendChild(canvas)

    frame.appendChild(el('div', 'ar-scrim'))
    var barTop = el('div', 'ar-bar ar-bar-top')
    var barBottom = el('div', 'ar-bar ar-bar-bottom')
    frame.appendChild(barTop)
    frame.appendChild(barBottom)

    var hud = el('div', 'ar-hud')
    var badge = el('div', 'ar-badge')
    badge.appendChild(el('strong', null, cfg.label))
    badge.appendChild(el('span', null, cfg.sublabel))
    hud.appendChild(badge)
    frame.appendChild(hud)

    var caption = el('div', 'ar-caption')
    var capInner = el('div', 'ar-cap-inner')
    var kicker = el('p', 'ar-kicker')
    var title = el('h2', 'ar-title')
    var line = el('p', 'ar-line')
    var tags = el('div', 'ar-tags')
    var tag = el('span', 'ar-tag')
    tags.appendChild(tag)
    capInner.appendChild(kicker)
    capInner.appendChild(title)
    capInner.appendChild(line)
    capInner.appendChild(tags)
    var counter = el('div', 'ar-counter')
    var counterNum = el('span', 'ar-counter-num')
    var counterOf = el('span', 'ar-counter-of', 'of ' + (N < 10 ? '0' + N : N))
    counter.appendChild(counterNum)
    counter.appendChild(counterOf)
    caption.appendChild(capInner)
    caption.appendChild(counter)
    frame.appendChild(caption)

    /* chapter rail — also the keyboard-reachable way to navigate */
    var rail = el('nav', 'ar-rail')
    rail.setAttribute('aria-label', 'Reel chapters')
    var railFills = []
    for (var i = 0; i < N; i++) {
      var btn = el('button', 'ar-chapter')
      btn.type = 'button'
      btn.setAttribute('aria-label', 'Show ' + slides[i].title)
      btn.appendChild(el('span', 'ar-chapter-label', slides[i].tag || slides[i].title))
      var track = el('span', 'ar-chapter-track')
      var fill = el('span', 'ar-chapter-fill')
      track.appendChild(fill)
      btn.appendChild(track)
      railFills.push(fill)
      ;(function (index) {
        btn.addEventListener('click', function () { goTo(index) })
      })(i)
      rail.appendChild(btn)
    }
    frame.appendChild(rail)

    var scrub = el('div', 'ar-scrub')
    var scrubFill = el('span', 'ar-scrub-fill')
    scrub.appendChild(scrubFill)
    frame.appendChild(scrub)

    var hint = el('div', 'ar-hint')
    hint.appendChild(el('span', null, cfg.mode === 'scroll' ? 'Scroll to play' : ''))
    if (cfg.mode === 'scroll') frame.appendChild(hint)

    /* every caption in the DOM, for screen readers and search engines */
    var sr = el('ul', 'ar-sr')
    for (i = 0; i < N; i++) {
      sr.appendChild(el('li', null, slides[i].title + ' — ' + (slides[i].line || '') + ' ' + (slides[i].alt || '')))
    }
    frame.appendChild(sr)

    /* ---- no WebGL, or motion is unwelcome: plain photo strip -------- */
    var renderer
    try {
      if (reduced) throw new Error('reduced motion')
      renderer = new Renderer(canvas)
    } catch (e) {
      root.classList.add('ar-static')
      canvas.parentNode.removeChild(canvas)
      var strip = el('div', 'ar-strip')
      for (i = 0; i < N; i++) {
        var fig = el('figure', 'ar-strip-item')
        var pic = new Image()
        pic.src = slides[i].photo + '-1600.jpg'
        pic.alt = slides[i].alt || slides[i].title
        pic.loading = 'lazy'
        pic.decoding = 'async'
        var cap = el('figcaption')
        cap.appendChild(el('p', 'ar-kicker', slides[i].kicker))
        cap.appendChild(el('p', 'ar-strip-title', slides[i].title))
        cap.appendChild(el('p', 'ar-line', slides[i].line))
        fig.appendChild(pic)
        fig.appendChild(cap)
        strip.appendChild(fig)
      }
      root.innerHTML = ''
      root.appendChild(strip)
      return
    }

    /* ---- photos ---------------------------------------------------- */
    var big = window.innerWidth >= 900 && renderer.maxTextureSize() >= 2400
    var size = big ? '2200' : '1600'
    var ext = supportsWebP() ? 'webp' : 'jpg'
    var firstReady = false
    var images = []
    for (i = 0; i < N; i++) {
      ;(function (index) {
        var img = new Image()
        img.decoding = 'async'
        img.onload = function () {
          renderer.setImage(index, img)
          if (index === 0) { firstReady = true; frame.classList.add('ar-painted') }
        }
        img.src = slides[index].photo + '-' + size + '.' + ext
        images.push(img)
      })(i)
    }

    /* ---- live state ------------------------------------------------ */
    var raf = 0
    var elapsed = 0          /* ms into the reel, auto mode */
    var smooth = 0           /* damped 0..1 scroll position, scroll mode */
    var reveal = 0
    var visible = false
    var mouse = [0, 0]
    var target = [0, 0]
    var activeIndex = -1
    var lastBar = ''
    var dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.25 : 1.5)
    var intensity = cfg.intensity * (window.innerWidth < 640 ? 0.85 : 1)
    var slowFrames = 0
    var degraded = false
    var cycle = cfg.holdMs + cfg.cutMs
    var holdFrac = cfg.holdMs / cycle
    var MODES = 9
    var loopIndex = 0

    /** Which transition plays out of slide `i` on the loop we are on. */
    function modeFor(i) {
      var base = slides[i].mode || 0
      return cfg.cycleEffects ? (base + loopIndex * N) % MODES : base % MODES
    }

    var trackH = 0, stageH = 0, frameW = 0, frameH = 0
    function measure() {
      trackH = root.offsetHeight
      stageH = stage.offsetHeight
      frameW = frame.clientWidth
      frameH = frame.clientHeight
    }
    measure()

    var ro = window.ResizeObserver ? new ResizeObserver(measure) : null
    if (ro) { ro.observe(root); ro.observe(stage); ro.observe(frame) }
    else window.addEventListener('resize', measure)

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting
      }).observe(frame)
    } else visible = true

    frame.addEventListener('pointermove', function (e) {
      var r = frame.getBoundingClientRect()
      target[0] = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1)
      target[1] = clamp((1 - (e.clientY - r.top) / r.height) * 2 - 1, -1, 1)
    })
    frame.addEventListener('pointerleave', function () { target[0] = 0; target[1] = 0 })

    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault()
      cancelAnimationFrame(raf)
    })

    /** Jumps so slide `i` is resting in the middle of its hold. */
    function goTo(i) {
      if (cfg.mode === 'auto') {
        elapsed = (i + holdFrac * 0.45) * cycle
      } else {
        var travel = Math.max(trackH - stageH, 1)
        window.scrollTo({
          top: root.offsetTop + travel * ((i + holdFrac * 0.45) / N),
          behavior: 'smooth',
        })
      }
    }

    root.tabIndex = 0
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { goTo((activeIndex + 1) % N); e.preventDefault() }
      if (e.key === 'ArrowLeft') { goTo((activeIndex - 1 + N) % N); e.preventDefault() }
    })

    function setCaption(i) {
      var s = slides[i]
      kicker.textContent = s.kicker || ''
      kineticTitle(title, s.title || '')
      line.textContent = s.line || ''
      tag.textContent = s.tag || ''
      counterNum.textContent = i + 1 < 10 ? '0' + (i + 1) : String(i + 1)
      canvas.setAttribute('aria-label', s.alt || s.title)
      /* restart the entry animations by reflowing the caption */
      capInner.classList.remove('ar-in')
      void capInner.offsetWidth
      capInner.classList.add('ar-in')
      for (var j = 0; j < N; j++) {
        rail.children[j].setAttribute('aria-current', j === i ? 'true' : 'false')
      }
    }
    setCaption(0)

    /* ---- the loop --------------------------------------------------- */
    var start = performance.now()
    var last = start

    function tick(now) {
      raf = requestAnimationFrame(tick)
      var dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || document.hidden) return

      /* a couple of seconds of missed frames and the effect load drops,
         rather than the framerate */
      if (!degraded && firstReady) {
        if (dt > 0.028) slowFrames++
        else slowFrames = Math.max(0, slowFrames - 1)
        if (slowFrames > 60) { degraded = true; dpr = 1; intensity = 0.5 }
      }

      var t, idx, local, tp, p

      if (cfg.mode === 'scroll') {
        var rect = root.getBoundingClientRect()
        var travel = Math.max(trackH - stageH, 1)
        var raw = clamp(-rect.top / travel, 0, 1)
        smooth += (raw - smooth) * (1 - Math.exp(-dt * 9))
        p = smooth
        t = clamp(p, 0, 0.99999) * N
        idx = Math.min(Math.floor(t), N - 1)
        local = t - idx
        tp = idx >= N - 1 ? 0 : smoother(clamp((local - holdFrac) / (1 - holdFrac), 0, 1))

        /* cinemascope bars close as the reel docks and open as it leaves */
        var vh = window.innerHeight || 1
        var dock = clamp(1 - rect.top / vh, 0, 1)
        var exit = clamp((rect.bottom - stageH) / vh, 0, 1)
        var bar = (6.2 * easeOut(Math.min(dock, exit))).toFixed(2) + 'svh'
        if (bar !== lastBar) { lastBar = bar; frame.style.setProperty('--ar-bar', bar) }
      } else {
        /* driven by a clock, so the pacing cannot stutter with the
           input device the way a scroll wheel does */
        elapsed += dt * 1000
        t = elapsed / cycle
        idx = Math.floor(t) % N
        loopIndex = Math.floor(t / N)
        local = t - Math.floor(t)
        tp = local < holdFrac ? 0 : smoother((local - holdFrac) / (1 - holdFrac))
        p = ((idx + local) / N) % 1
        if (lastBar !== '6.20svh') { lastBar = '6.20svh'; frame.style.setProperty('--ar-bar', '6.20svh') }
      }

      mouse[0] += (target[0] - mouse[0]) * (1 - Math.exp(-dt * 6))
      mouse[1] += (target[1] - mouse[1]) * (1 - Math.exp(-dt * 6))
      reveal += ((firstReady ? 1 : 0) - reveal) * (1 - Math.exp(-dt * 3))

      renderer.resize(frameW, frameH, dpr)
      renderer.draw({
        from: idx,
        to: cfg.mode === 'auto' ? (idx + 1) % N : Math.min(idx + 1, N - 1),
        progress: tp,
        mode: modeFor(idx),
        kenFrom: local,
        kenTo: local - 1,
        mouse: mouse,
        intensity: intensity,
        reveal: reveal,
        time: ((now - start) / 1000) % 1800,
      })

      scrubFill.style.transform = 'scaleX(' + p.toFixed(4) + ')'
      for (var j = 0; j < N; j++) {
        railFills[j].style.transform = 'scaleY(' + clamp(t - j, 0, 1).toFixed(3) + ')'
      }
      if (cfg.mode === 'scroll') hint.style.opacity = clamp(1 - p * 26, 0, 1)

      var next = tp > 0.5 ? (cfg.mode === 'auto' ? (idx + 1) % N : Math.min(idx + 1, N - 1)) : idx
      if (next !== activeIndex) { activeIndex = next; setCaption(next) }
    }
    raf = requestAnimationFrame(tick)

    return {
      goTo: goTo,
      /** Park the reel at photo `index`, `local` of the way through its
          cycle (0 = just arrived, 1 = the next photo has fully landed).
          Autoplay only — handy for scripting or for grabbing stills. */
      seekTo: function (index, local) {
        elapsed = (index + (local || 0)) * cycle
      },
      /** Where a cut is at its midpoint, for `seekTo`. */
      midCut: holdFrac + (1 - holdFrac) * 0.5,
      destroy: function () {
        cancelAnimationFrame(raf)
        if (ro) ro.disconnect()
        renderer.dispose()
        root.innerHTML = ''
      },
    }
  }

  function boot() {
    var nodes = document.querySelectorAll('[data-atom-reel]')
    for (var i = 0; i < nodes.length; i++) mount(nodes[i])
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else boot()

  window.AtomReel = { mount: mount, slides: SLIDES, config: CONFIG }
})()
