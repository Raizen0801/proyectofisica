(()=>{var i_=Object.defineProperty;var s_=(s,e)=>{for(var t in e)i_(s,t,{get:e[t],enumerable:!0})};var Td=[[1e12,"T"],[1e9,"G"],[1e6,"M"],[1e3,"k"],[1,""],[.001,"m"],[1e-6,"\xB5"],[1e-9,"n"],[1e-12,"p"],[1e-15,"f"],[1e-18,"a"]];function ge(s,e="",t=3){if(!isFinite(s))return s>0?"\u221E "+e:s<0?"\u2212\u221E "+e:"\u2014 "+e;if(s===0)return`0 ${e}`.trim();let n=Math.abs(s),i=Td[Td.length-1];for(let o of Td)if(n>=o[0]*.99995){i=o;break}let r=s/i[0];return`${Math.abs(r)>=Math.pow(10,t)?r.toFixed(0):r.toPrecision(t)} ${i[1]}${e}`.trim()}function vn(s,e=3){if(!isFinite(s))return"\u2014";if(s===0)return"0";let[t,n]=s.toExponential(e-1).split("e"),i=parseInt(n,10);if(i===0)return t;let r=String(i).replace(/-/g,"\u207B").replace(/\d/g,a=>"\u2070\xB9\xB2\xB3\u2074\u2075\u2076\u2077\u2078\u2079"[a]);return`${t}\xD710${r}`}var om=s=>s*180/Math.PI,Er=s=>s*Math.PI/180,lm=(s,e,t)=>Math.min(t,Math.max(e,s));function T(s,e={},...t){let n=s==="svg"||e.ns==="svg"?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s);for(let[i,r]of Object.entries(e||{}))if(!(i==="ns"||r===void 0||r===null||r===!1))if(i==="class")n.setAttribute("class",r);else if(i==="style"&&typeof r=="object")Object.assign(n.style,r);else if(i.startsWith("on")&&typeof r=="function")n.addEventListener(i.slice(2).toLowerCase(),r);else if(i==="html")n.innerHTML=r;else if(i in n&&i!=="list"&&!(n instanceof SVGElement))try{n[i]=r}catch{n.setAttribute(i,r)}else n.setAttribute(i,r===!0?"":r);for(let i of t.flat(1/0))i==null||i===!1||n.append(i.nodeType?i:document.createTextNode(String(i)));return n}var bi=(s,e={},...t)=>T(s,{...e,ns:"svg"},...t),ot=(s,...e)=>T("section",{class:"group"},s?T("h3",{},s):null,...e);function ht({label:s,min:e,max:t,step:n,value:i,unit:r="",log:a=!1,fmt:o,onInput:l,digits:c=3}){let h=T("b",{}),u=a?Math.log10(e):e,d=a?Math.log10(t):t,f=T("input",{type:"range",min:u,max:d,step:a?(d-u)/400:n??(d-u)/400}),p=y=>{let M=a?Math.pow(10,parseFloat(y)):parseFloat(y);return!a&&n&&(M=Math.round(M/n)*n),M},x=y=>{h.textContent=o?o(y):`${+y.toPrecision(c)} ${r}`.trim()},m=null,g={el:T("div",{class:"field"},T("div",{class:"lbl"},T("span",{},s),h),f),get:()=>m!==null?m:p(f.value),set:(y,M=!0)=>{y=lm(y,e,t),f.value=a?Math.log10(y):y,m=y,x(y),!M&&l&&l(y)},input:f,setEnabled:y=>{f.disabled=!y}};return f.addEventListener("input",()=>{m=null;let y=g.get();x(y),l&&l(y)}),g.set(i),g}function Jt({label:s,value:e,step:t="any",min:n,max:i,unit:r="",onInput:a,width:o}){let l=T("input",{type:"number",value:e,step:t,min:n,max:i});o&&(l.style.width=o);let c={el:T("label",{class:"field"},T("span",{class:"lbl"},T("span",{},s),r?T("span",{},r):null),l),input:l,get:()=>parseFloat(l.value),set:h=>{l.value=h}};return l.addEventListener("input",()=>{a&&isFinite(c.get())&&a(c.get())}),c}function ln({label:s,options:e,value:t,onInput:n}){let i=T("select",{},e.map(a=>T("option",{value:a.value??a,selected:(a.value??a)===t},a.label??a))),r={el:T("label",{class:"field"},s?T("span",{class:"lbl"},T("span",{},s)):null,i),input:i,get:()=>i.value,set:a=>{i.value=a}};return i.addEventListener("input",()=>n&&n(i.value)),r}function zt({label:s,value:e=!1,onInput:t}){let n=T("input",{type:"checkbox",checked:e}),i={el:T("label",{class:"check"},n,T("span",{},s)),input:n,get:()=>n.checked,set:r=>{n.checked=r}};return n.addEventListener("input",()=>t&&t(n.checked)),i}function Rn(s,e,t){let n=T("div",{class:"seg"}),i=s.map(a=>{let o=T("button",{type:"button",class:a.value===e?"on":"",onclick:()=>r.set(a.value,!0)},a.label);return n.append(o),o}),r={el:n,value:e,set(a,o){r.value=a,i.forEach((l,c)=>l.classList.toggle("on",s[c].value===a)),o&&t&&t(a)},get:()=>r.value};return r}var On=(s,e,t="")=>T("button",{type:"button",class:`btn ${t}`.trim(),onclick:e},s);function Vt(s){let e={};return{el:T("div",{class:"readouts"},s.map(n=>{let i=T("div",{class:"v"},"\u2014"),r=T("div",{class:"s"}),a=T("div",{class:"ro"},T("div",{class:"k"},n.label),i,r);return e[n.key]={v:i,s:r,box:a},a})),update(n){for(let[i,r]of Object.entries(n)){let a=e[i];if(!a)continue;let[o,l="",c=""]=Array.isArray(r)?r:[r];a.v.textContent=o,a.s.textContent=l,a.box.className=`ro ${c}`.trim()}}}}function cn(s,e,t=[]){return T("div",{class:"mod-title"},T("div",{},t.map(n=>T("span",{class:"tag"},n))),T("h2",{style:{marginTop:"6px"}},s),T("p",{},e))}function qn(s,e=80){let t;return(...n)=>{clearTimeout(t),t=setTimeout(()=>s(...n),e)}}function cm(s){let e=!1,t;return(...n)=>{t=n,!e&&(e=!0,requestAnimationFrame(()=>{e=!1,s(...t)}))}}var oe={};s_(oe,{ACESFilmicToneMapping:()=>zu,AddEquation:()=>Ss,AddOperation:()=>Xf,AdditiveAnimationBlendMode:()=>Ju,AdditiveBlending:()=>Iu,AgXToneMapping:()=>ku,AlphaFormat:()=>Yu,AlwaysCompare:()=>sp,AlwaysDepth:()=>Eo,AlwaysStencilFunc:()=>jf,AmbientLight:()=>hr,AnimationAction:()=>Fl,AnimationClip:()=>vs,AnimationLoader:()=>Yh,AnimationMixer:()=>ou,AnimationObjectGroup:()=>au,AnimationUtils:()=>$h,ArcCurve:()=>Zo,ArrayCamera:()=>Ll,ArrowHelper:()=>Ia,AttachedBindMode:()=>Ah,Audio:()=>Ul,AudioAnalyser:()=>ru,AudioContext:()=>Ca,AudioListener:()=>iu,AudioLoader:()=>tu,AxesHelper:()=>Tu,BackSide:()=>gn,BasicDepthPacking:()=>Jf,BasicShadowMap:()=>Mg,BatchedMesh:()=>Vo,BezierInterpolant:()=>Ml,Bone:()=>ra,BooleanKeyframeTrack:()=>Ei,Box2:()=>Ol,Box3:()=>Pt,Box3Helper:()=>wu,BoxGeometry:()=>gs,BoxHelper:()=>Su,BufferAttribute:()=>vt,BufferGeometry:()=>it,BufferGeometryLoader:()=>Pl,ByteType:()=>Wu,Cache:()=>ci,Camera:()=>lr,CameraHelper:()=>Mu,CanvasTexture:()=>oa,CapsuleGeometry:()=>Xo,CatmullRomCurve3:()=>Jo,CineonToneMapping:()=>Bu,CircleGeometry:()=>qo,ClampToEdgeWrapping:()=>Sn,Clock:()=>fu,Color:()=>ze,ColorKeyframeTrack:()=>Sa,ColorManagement:()=>lt,Compatibility:()=>h0,CompressedArrayTexture:()=>Hh,CompressedCubeTexture:()=>Wh,CompressedTexture:()=>er,CompressedTextureLoader:()=>Zh,ConeGeometry:()=>xs,ConstantAlphaFactor:()=>Gf,ConstantColorFactor:()=>Vf,Controls:()=>La,CubeCamera:()=>Il,CubeDepthTexture:()=>Wo,CubeReflectionMapping:()=>gi,CubeRefractionMapping:()=>Ji,CubeTexture:()=>ms,CubeTextureLoader:()=>Jh,CubeUVReflectionMapping:()=>mr,CubicBezierCurve:()=>ha,CubicBezierCurve3:()=>Ko,CubicInterpolant:()=>vl,CullFaceBack:()=>Pu,CullFaceFront:()=>wf,CullFaceFrontBack:()=>bg,CullFaceNone:()=>Sf,Curve:()=>Nn,CurvePath:()=>Qo,CustomBlending:()=>Tf,CustomToneMapping:()=>Vu,CylinderGeometry:()=>ca,Cylindrical:()=>pu,Data3DTexture:()=>Ys,DataArrayTexture:()=>$s,DataTexture:()=>wn,DataTextureLoader:()=>Kh,DataUtils:()=>Lh,DecrementStencilOp:()=>kg,DecrementWrapStencilOp:()=>Hg,DefaultLoadingManager:()=>cp,DepthFormat:()=>hi,DepthStencilFormat:()=>Ki,DepthTexture:()=>Hi,DetachedBindMode:()=>qf,DirectionalLight:()=>cr,DirectionalLightHelper:()=>bu,DiscreteInterpolant:()=>bl,DodecahedronGeometry:()=>$o,DoubleSide:()=>pi,DstAlphaFactor:()=>Nf,DstColorFactor:()=>Of,DynamicCopyUsage:()=>s0,DynamicDrawUsage:()=>jg,DynamicReadUsage:()=>t0,EdgesGeometry:()=>Yo,EllipseCurve:()=>tr,EqualCompare:()=>tp,EqualDepth:()=>Ao,EqualStencilFunc:()=>$g,EquirectangularReflectionMapping:()=>Na,EquirectangularRefractionMapping:()=>Fa,Euler:()=>Jn,EventDispatcher:()=>Un,ExternalTexture:()=>la,ExtrudeGeometry:()=>il,FileLoader:()=>Kn,Float16BufferAttribute:()=>Bh,Float32BufferAttribute:()=>Ve,FloatType:()=>fn,Fog:()=>Uo,FogExp2:()=>Do,FramebufferTexture:()=>Gh,FrontSide:()=>Zi,Frustum:()=>wi,FrustumArray:()=>zo,GLBufferAttribute:()=>uu,GLSL1:()=>a0,GLSL3:()=>Ku,GreaterCompare:()=>np,GreaterDepth:()=>Ro,GreaterEqualCompare:()=>Sc,GreaterEqualDepth:()=>Co,GreaterEqualStencilFunc:()=>Kg,GreaterStencilFunc:()=>Zg,GridHelper:()=>Pa,Group:()=>li,HTMLTexture:()=>Xh,HalfFloatType:()=>Qn,HemisphereLight:()=>wl,HemisphereLightHelper:()=>yu,IcosahedronGeometry:()=>sl,ImageBitmapLoader:()=>eu,ImageLoader:()=>bs,ImageUtils:()=>Lo,IncrementStencilOp:()=>Vg,IncrementWrapStencilOp:()=>Gg,InstancedBufferAttribute:()=>Gi,InstancedBufferGeometry:()=>ur,InstancedInterleavedBuffer:()=>qi,InstancedMesh:()=>Bo,Int16BufferAttribute:()=>Fh,Int32BufferAttribute:()=>Oh,Int8BufferAttribute:()=>Dh,IntType:()=>zl,InterleavedBuffer:()=>js,InterleavedBufferAttribute:()=>mn,Interpolant:()=>Xi,InterpolateBezier:()=>Ch,InterpolateDiscrete:()=>Jr,InterpolateLinear:()=>Io,InterpolateSmooth:()=>_o,InterpolationSamplingMode:()=>c0,InterpolationSamplingType:()=>l0,InvertStencilOp:()=>Wg,KeepStencilOp:()=>yo,KeyframeTrack:()=>En,LOD:()=>No,LatheGeometry:()=>rl,Layers:()=>Zs,LessCompare:()=>ep,LessDepth:()=>To,LessEqualCompare:()=>Mc,LessEqualDepth:()=>Xs,LessEqualStencilFunc:()=>Yg,LessStencilFunc:()=>qg,Light:()=>fi,LightProbe:()=>Cl,LightShadow:()=>or,Line:()=>di,Line3:()=>Ra,LineBasicMaterial:()=>jt,LineCurve:()=>ua,LineCurve3:()=>jo,LineDashedMaterial:()=>yl,LineLoop:()=>ko,LineSegments:()=>Gn,LinearFilter:()=>Ct,LinearInterpolant:()=>Ma,LinearMipMapLinearFilter:()=>Ag,LinearMipMapNearestFilter:()=>Tg,LinearMipmapLinearFilter:()=>xi,LinearMipmapNearestFilter:()=>Oa,LinearSRGBColorSpace:()=>jr,LinearToneMapping:()=>Fu,LinearTransfer:()=>Qr,Loader:()=>nn,LoaderUtils:()=>Aa,LoadingManager:()=>Ea,LoopOnce:()=>$f,LoopPingPong:()=>Zf,LoopRepeat:()=>Yf,MOUSE:()=>$i,Material:()=>Xt,MaterialBlending:()=>Sg,MaterialLoader:()=>Rl,MathUtils:()=>Xa,Matrix2:()=>mu,Matrix3:()=>tt,Matrix4:()=>Qe,MaxEquation:()=>Pf,Mesh:()=>Et,MeshBasicMaterial:()=>kn,MeshDepthMaterial:()=>va,MeshDistanceMaterial:()=>ba,MeshLambertMaterial:()=>xl,MeshMatcapMaterial:()=>_l,MeshNormalMaterial:()=>gl,MeshPhongMaterial:()=>pl,MeshPhysicalMaterial:()=>fl,MeshStandardMaterial:()=>ya,MeshToonMaterial:()=>ml,MinEquation:()=>Rf,MirroredRepeatWrapping:()=>Zr,MixOperation:()=>Wf,MultiplyBlending:()=>Du,MultiplyOperation:()=>Ua,NearestFilter:()=>Ft,NearestMipMapLinearFilter:()=>Eg,NearestMipMapNearestFilter:()=>wg,NearestMipmapLinearFilter:()=>gr,NearestMipmapNearestFilter:()=>Hu,NeutralToneMapping:()=>Gu,NeverCompare:()=>Qf,NeverDepth:()=>wo,NeverStencilFunc:()=>Xg,NoBlending:()=>mi,NoColorSpace:()=>Ci,NoNormalPacking:()=>Ng,NoToneMapping:()=>jn,NormalAnimationBlendMode:()=>bc,NormalBlending:()=>pr,NormalGAPacking:()=>Og,NormalRGPacking:()=>Fg,NotEqualCompare:()=>ip,NotEqualDepth:()=>Po,NotEqualStencilFunc:()=>Jg,NumberKeyframeTrack:()=>rr,Object3D:()=>pt,ObjectLoader:()=>Qh,ObjectSpaceNormalMap:()=>Kf,OctahedronGeometry:()=>ga,OneFactor:()=>Lf,OneMinusConstantAlphaFactor:()=>Hf,OneMinusConstantColorFactor:()=>kf,OneMinusDstAlphaFactor:()=>Ff,OneMinusDstColorFactor:()=>Bf,OneMinusSrcAlphaFactor:()=>Nu,OneMinusSrcColorFactor:()=>Uf,OrthographicCamera:()=>Ms,PCFShadowMap:()=>Da,PCFSoftShadowMap:()=>Ef,PMREMGenerator:()=>Cc,Path:()=>_s,PerspectiveCamera:()=>Nt,Plane:()=>Ln,PlaneGeometry:()=>ir,PlaneHelper:()=>Eu,PointLight:()=>Tl,PointLightHelper:()=>_u,Points:()=>Go,PointsMaterial:()=>aa,PolarGridHelper:()=>vu,PolyhedronGeometry:()=>Wi,PositionalAudio:()=>su,PropertyBinding:()=>yt,PropertyMixer:()=>Nl,QuadraticBezierCurve:()=>da,QuadraticBezierCurve3:()=>fa,Quaternion:()=>Gt,QuaternionKeyframeTrack:()=>ar,QuaternionLinearInterpolant:()=>Sl,R11_EAC_Format:()=>jl,RED_GREEN_RGTC2_Format:()=>Wa,RED_RGTC1_Format:()=>_c,REVISION:()=>Mf,RG11_EAC_Format:()=>Ha,RGBADepthPacking:()=>Lg,RGBAFormat:()=>pn,RGBAIntegerFormat:()=>Wl,RGBA_ASTC_10x10_Format:()=>dc,RGBA_ASTC_10x5_Format:()=>cc,RGBA_ASTC_10x6_Format:()=>hc,RGBA_ASTC_10x8_Format:()=>uc,RGBA_ASTC_12x10_Format:()=>fc,RGBA_ASTC_12x12_Format:()=>pc,RGBA_ASTC_4x4_Format:()=>tc,RGBA_ASTC_5x4_Format:()=>nc,RGBA_ASTC_5x5_Format:()=>ic,RGBA_ASTC_6x5_Format:()=>sc,RGBA_ASTC_6x6_Format:()=>rc,RGBA_ASTC_8x5_Format:()=>ac,RGBA_ASTC_8x6_Format:()=>oc,RGBA_ASTC_8x8_Format:()=>lc,RGBA_BPTC_Format:()=>mc,RGBA_ETC2_EAC_Format:()=>Kl,RGBA_PVRTC_2BPPV1_Format:()=>Yl,RGBA_PVRTC_4BPPV1_Format:()=>$l,RGBA_S3TC_DXT1_Format:()=>Va,RGBA_S3TC_DXT3_Format:()=>ka,RGBA_S3TC_DXT5_Format:()=>Ga,RGBDepthPacking:()=>Dg,RGBFormat:()=>Zu,RGBIntegerFormat:()=>Cg,RGB_BPTC_SIGNED_Format:()=>gc,RGB_BPTC_UNSIGNED_Format:()=>xc,RGB_ETC1_Format:()=>Zl,RGB_ETC2_Format:()=>Jl,RGB_PVRTC_2BPPV1_Format:()=>ql,RGB_PVRTC_4BPPV1_Format:()=>Xl,RGB_S3TC_DXT1_Format:()=>za,RGDepthPacking:()=>Ug,RGFormat:()=>ji,RGIntegerFormat:()=>Hl,RawShaderMaterial:()=>_a,Ray:()=>ui,Raycaster:()=>du,RectAreaLight:()=>Al,RedFormat:()=>Gl,RedIntegerFormat:()=>Ba,ReinhardToneMapping:()=>Ou,RenderObjectRefreshType:()=>u0,RenderTarget:()=>na,RenderTarget3D:()=>lu,RepeatWrapping:()=>Yr,ReplaceStencilOp:()=>zg,ReverseSubtractEquation:()=>Cf,RingGeometry:()=>al,SIGNED_R11_EAC_Format:()=>Ql,SIGNED_RED_GREEN_RGTC2_Format:()=>vc,SIGNED_RED_RGTC1_Format:()=>yc,SIGNED_RG11_EAC_Format:()=>ec,SRGBColorSpace:()=>Qt,SRGBTransfer:()=>mt,Scene:()=>Ks,ShaderChunk:()=>rt,ShaderLib:()=>_n,ShaderMaterial:()=>tn,ShadowMaterial:()=>dl,Shape:()=>ys,ShapeGeometry:()=>ol,ShapePath:()=>Au,ShapeUtils:()=>Zn,ShortType:()=>Xu,Skeleton:()=>Oo,SkeletonHelper:()=>xu,SkinnedMesh:()=>Fo,Source:()=>Rh,Sphere:()=>It,SphereGeometry:()=>xa,Spherical:()=>dr,SphericalHarmonics3:()=>Ta,SplineCurve:()=>pa,SpotLight:()=>El,SpotLightHelper:()=>gu,Sprite:()=>Qs,SpriteMaterial:()=>ps,SrcAlphaFactor:()=>Uu,SrcAlphaSaturateFactor:()=>zf,SrcColorFactor:()=>Df,StaticCopyUsage:()=>i0,StaticDrawUsage:()=>wc,StaticReadUsage:()=>e0,StereoCamera:()=>nu,StreamCopyUsage:()=>r0,StreamDrawUsage:()=>Qg,StreamReadUsage:()=>n0,StringKeyframeTrack:()=>Ti,SubtractEquation:()=>Af,SubtractiveBlending:()=>Lu,TOUCH:()=>Yi,TangentSpaceNormalMap:()=>Ai,TetrahedronGeometry:()=>ll,Texture:()=>Ot,TextureLoader:()=>jh,TextureSource:()=>Yn,TextureUtils:()=>Cu,Timer:()=>Dl,TimestampQuery:()=>o0,TorusGeometry:()=>cl,TorusKnotGeometry:()=>hl,Triangle:()=>oi,TriangleFanDrawMode:()=>Ig,TriangleStripDrawMode:()=>Pg,TrianglesDrawMode:()=>Rg,TubeGeometry:()=>ul,UVMapping:()=>Bl,Uint16BufferAttribute:()=>ia,Uint32BufferAttribute:()=>sa,Uint8BufferAttribute:()=>Uh,Uint8ClampedBufferAttribute:()=>Nh,Uniform:()=>cu,UniformsGroup:()=>hu,UniformsLib:()=>Ie,UniformsUtils:()=>qa,UnsignedByteType:()=>Tn,UnsignedInt101111Type:()=>$u,UnsignedInt248Type:()=>_r,UnsignedInt5999Type:()=>qu,UnsignedIntType:()=>Hn,UnsignedShort4444Type:()=>Vl,UnsignedShort5551Type:()=>kl,UnsignedShortType:()=>xr,VSMShadowMap:()=>fr,Vector2:()=>Me,Vector3:()=>L,Vector4:()=>ut,VectorKeyframeTrack:()=>wa,VideoFrameTexture:()=>kh,VideoTexture:()=>Ho,WebGL3DRenderTarget:()=>Ih,WebGLArrayRenderTarget:()=>Ph,WebGLCoordinateSystem:()=>Dn,WebGLCubeRenderTarget:()=>Rc,WebGLRenderTarget:()=>en,WebGLRenderer:()=>Pc,WebGLUtils:()=>tx,WebGPUCoordinateSystem:()=>ds,WebXRController:()=>Js,WireframeGeometry:()=>sr,WrapAroundEnding:()=>Kr,ZeroCurvatureEnding:()=>hs,ZeroFactor:()=>If,ZeroSlopeEnding:()=>us,ZeroStencilOp:()=>Bg,createCanvasElement:()=>rp,error:()=>Je,getConsoleFunction:()=>p0,log:()=>ta,setConsoleFunction:()=>f0,warn:()=>De,warnOnce:()=>Si});var Mf="186",$i={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sf=0,Pu=1,wf=2,bg=3,Mg=0,Da=1,Ef=2,fr=3,Zi=0,gn=1,pi=2,mi=0,pr=1,Iu=2,Lu=3,Du=4,Tf=5,Sg=6,Ss=100,Af=101,Cf=102,Rf=103,Pf=104,If=200,Lf=201,Df=202,Uf=203,Uu=204,Nu=205,Nf=206,Ff=207,Of=208,Bf=209,zf=210,Vf=211,kf=212,Gf=213,Hf=214,wo=0,Eo=1,To=2,Xs=3,Ao=4,Co=5,Ro=6,Po=7,Ua=0,Wf=1,Xf=2,jn=0,Fu=1,Ou=2,Bu=3,zu=4,Vu=5,ku=6,Gu=7,Ah="attached",qf="detached",Bl=300,gi=301,Ji=302,Na=303,Fa=304,mr=306,Yr=1e3,Sn=1001,Zr=1002,Ft=1003,Hu=1004,wg=1004,gr=1005,Eg=1005,Ct=1006,Oa=1007,Tg=1007,xi=1008,Ag=1008,Tn=1009,Wu=1010,Xu=1011,xr=1012,zl=1013,Hn=1014,fn=1015,Qn=1016,Vl=1017,kl=1018,_r=1020,qu=35902,$u=35899,Yu=1021,Zu=1022,pn=1023,hi=1026,Ki=1027,Gl=1028,Ba=1029,ji=1030,Hl=1031,Cg=1032,Wl=1033,za=33776,Va=33777,ka=33778,Ga=33779,Xl=35840,ql=35841,$l=35842,Yl=35843,Zl=36196,Jl=37492,Kl=37496,jl=37488,Ql=37489,Ha=37490,ec=37491,tc=37808,nc=37809,ic=37810,sc=37811,rc=37812,ac=37813,oc=37814,lc=37815,cc=37816,hc=37817,uc=37818,dc=37819,fc=37820,pc=37821,mc=36492,gc=36494,xc=36495,_c=36283,yc=36284,Wa=36285,vc=36286,$f=2200,Yf=2201,Zf=2202,Jr=2300,Io=2301,_o=2302,Ch=2303,hs=2400,us=2401,Kr=2402,bc=2500,Ju=2501,Rg=0,Pg=1,Ig=2,Jf=3200,Lg=3201,Dg=3202,Ug=3203,Ai=0,Kf=1,Ci="",Qt="srgb",jr="srgb-linear",Qr="linear",mt="srgb",Ng="",Fg="rg",Og="ga",Bg=0,yo=7680,zg=7681,Vg=7682,kg=7683,Gg=34055,Hg=34056,Wg=5386,Xg=512,qg=513,$g=514,Yg=515,Zg=516,Jg=517,Kg=518,jf=519,Qf=512,ep=513,tp=514,Mc=515,np=516,ip=517,Sc=518,sp=519,wc=35044,jg=35048,Qg=35040,e0=35045,t0=35049,n0=35041,i0=35046,s0=35050,r0=35042,a0="100",Ku="300 es",Dn=2e3,ds=2001,o0={COMPUTE:"compute",RENDER:"render"},l0={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},c0={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},h0={TEXTURE_COMPARE:"depthTextureCompare"},u0={NONE:0,SHARED:1,FULL:2};function r_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var a_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function qr(s,e){return new a_[s](e)}function d0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ea(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function rp(){let s=ea("canvas");return s.style.display="block",s}var hm={},fs=null;function f0(s){fs=s}function p0(){return fs}function ta(...s){let e="THREE."+s.shift();fs?fs("log",e,...s):console.log(e,...s)}function m0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function De(...s){s=m0(s);let e="THREE."+s.shift();if(fs)fs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=m0(s);let e="THREE."+s.shift();if(fs)fs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Si(...s){let e=s.join(" ");e in hm||(hm[e]=!0,De(...s))}function g0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var x0={[wo]:Eo,[To]:Ro,[Ao]:Po,[Xs]:Co,[Eo]:wo,[Ro]:To,[Po]:Ao,[Co]:Xs},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],um=1234567,Ws=Math.PI/180,qs=180/Math.PI;function Vn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[s&255]+hn[s>>8&255]+hn[s>>16&255]+hn[s>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function et(s,e,t){return Math.max(e,Math.min(t,s))}function ap(s,e){return(s%e+e)%e}function o_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function l_(s,e,t){return s!==e?(t-s)/(e-s):0}function vo(s,e,t){return(1-t)*s+t*e}function c_(s,e,t,n){return vo(s,e,1-Math.exp(-t*n))}function h_(s,e=1){return e-Math.abs(ap(s,e*2)-e)}function u_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function d_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function f_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function p_(s,e){return s+Math.random()*(e-s)}function m_(s){return s*(.5-Math.random())}function g_(s){s!==void 0&&(um=s);let e=um+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function x_(s){return s*Ws}function __(s){return s*qs}function y_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function v_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function b_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function M_(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Mn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function st(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Xa={DEG2RAD:Ws,RAD2DEG:qs,generateUUID:Vn,clamp:et,euclideanModulo:ap,mapLinear:o_,inverseLerp:l_,lerp:vo,damp:c_,pingpong:h_,smoothstep:u_,smootherstep:d_,randInt:f_,randFloat:p_,randFloatSpread:m_,seededRandom:g_,degToRad:x_,radToDeg:__,isPowerOfTwo:y_,ceilPowerOfTwo:v_,floorPowerOfTwo:b_,setQuaternionFromProperEuler:M_,normalize:st,denormalize:Mn},dp=class dp{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};dp.prototype.isVector2=!0;var Me=dp,Gt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],p=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==f||h!==p){let m=l*d+c*f+h*p+u*x;m<0&&(d=-d,f=-f,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let y=Math.acos(m),M=Math.sin(y);g=Math.sin(g*y)/M,o=Math.sin(o*y)/M,l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+x*o}else{l=l*g+d*o,c=c*g+f*o,h=h*g+p*o,u=u*g+x*o;let y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-o*f,e[t+2]=c*p+h*f+o*d-l*u,e[t+3]=h*p-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},fp=class fp{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ad.copy(this).projectOnVector(e),this.sub(Ad)}reflect(e){return this.sub(Ad.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};fp.prototype.isVector3=!0;var L=fp,Ad=new L,dm=new Gt,pp=class pp{constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],x=i[0],m=i[3],g=i[6],y=i[1],M=i[4],_=i[7],w=i[2],E=i[5],P=i[8];return r[0]=a*x+o*y+l*w,r[3]=a*m+o*M+l*E,r[6]=a*g+o*_+l*P,r[1]=c*x+h*y+u*w,r[4]=c*m+h*M+u*E,r[7]=c*g+h*_+u*P,r[2]=d*x+f*y+p*w,r[5]=d*m+f*M+p*E,r[8]=d*g+f*_+p*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Si("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Cd.makeScale(e,t)),this}rotate(e){return Si("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Cd.makeRotation(-e)),this}translate(e,t){return Si("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Cd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};pp.prototype.isMatrix3=!0;var tt=pp,Cd=new tt,fm=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pm=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function S_(){let s={enabled:!0,workingColorSpace:jr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===mt&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(i.r=$r(i.r),i.g=$r(i.g),i.b=$r(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ci?Qr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Si("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Si("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[jr]:{primaries:e,whitePoint:n,transfer:Qr,toXYZ:fm,fromXYZ:pm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:fm,fromXYZ:pm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),s}var lt=S_();function ki(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $r(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Tr,Lo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Tr===void 0&&(Tr=ea("canvas")),Tr.width=e.width,Tr.height=e.height;let i=Tr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Tr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ea("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ki(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ki(t[n]/255)*255):t[n]=ki(t[n]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},w_=0,Yn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=Vn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Rd(i[a].image)):r.push(Rd(i[a]))}else r=Rd(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Rd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Lo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}var Rh=class extends Yn{constructor(e=null){Si('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},E_=0,Pd=new L,Ot=class s extends Un{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Sn,i=Sn,r=Ct,a=xi,o=pn,l=Tn,c=s.DEFAULT_ANISOTROPY,h=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=Vn(),this.name="",this.source=new Yn(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pd).x}get height(){return this.source.getSize(Pd).y}get depth(){return this.source.getSize(Pd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yr:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yr:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Bl;Ot.DEFAULT_ANISOTROPY=1;var mp=class mp{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,_=(f+1)/2,w=(g+1)/2,E=(h+d)/4,P=(u+x)/4,b=(p+m)/4;return M>_&&M>w?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=E/n,r=P/n):_>w?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=E/i,r=b/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=P/r,i=b/r),this.set(n,i,r,t),this}let y=Math.sqrt((m-p)*(m-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};mp.prototype.isVector4=!0;var ut=mp,na=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Ot(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Yn(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends na{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$s=class extends Ot{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ph=class extends en{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new $s(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Ys=class extends Ot{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Ih=class extends en{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Ys(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Ru=class Ru{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,m)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,p,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ru().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Ar.setFromMatrixColumn(e,0).length(),r=1/Ar.setFromMatrixColumn(e,1).length(),a=1/Ar.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d+x*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,p=o*h,x=o*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=p*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(T_,e,A_)}lookAt(e,t,n){let i=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),ss.crossVectors(n,Bn),ss.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),ss.crossVectors(n,Bn)),ss.normalize(),Bc.crossVectors(Bn,ss),i[0]=ss.x,i[4]=Bc.x,i[8]=Bn.x,i[1]=ss.y,i[5]=Bc.y,i[9]=Bn.y,i[2]=ss.z,i[6]=Bc.z,i[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],x=n[6],m=n[10],g=n[14],y=n[3],M=n[7],_=n[11],w=n[15],E=i[0],P=i[4],b=i[8],S=i[12],I=i[1],B=i[5],G=i[9],z=i[13],C=i[2],N=i[6],F=i[10],V=i[14],se=i[3],J=i[7],Z=i[11],k=i[15];return r[0]=a*E+o*I+l*C+c*se,r[4]=a*P+o*B+l*N+c*J,r[8]=a*b+o*G+l*F+c*Z,r[12]=a*S+o*z+l*V+c*k,r[1]=h*E+u*I+d*C+f*se,r[5]=h*P+u*B+d*N+f*J,r[9]=h*b+u*G+d*F+f*Z,r[13]=h*S+u*z+d*V+f*k,r[2]=p*E+x*I+m*C+g*se,r[6]=p*P+x*B+m*N+g*J,r[10]=p*b+x*G+m*F+g*Z,r[14]=p*S+x*z+m*V+g*k,r[3]=y*E+M*I+_*C+w*se,r[7]=y*P+M*B+_*N+w*J,r[11]=y*b+M*G+_*F+w*Z,r[15]=y*S+M*z+_*V+w*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],x=e[7],m=e[11],g=e[15],y=l*f-c*d,M=o*f-c*u,_=o*d-l*u,w=a*f-c*h,E=a*d-l*h,P=a*u-o*h;return t*(x*y-m*M+g*_)-n*(p*y-m*w+g*E)+i*(p*M-x*w+g*P)-r*(p*_-x*E+m*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],x=e[13],m=e[14],g=e[15],y=t*o-n*a,M=t*l-i*a,_=t*c-r*a,w=n*l-i*o,E=n*c-r*o,P=i*c-r*l,b=h*x-u*p,S=h*m-d*p,I=h*g-f*p,B=u*m-d*x,G=u*g-f*x,z=d*g-f*m,C=y*z-M*G+_*B+w*I-E*S+P*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/C;return e[0]=(o*z-l*G+c*B)*N,e[1]=(i*G-n*z-r*B)*N,e[2]=(x*P-m*E+g*w)*N,e[3]=(d*E-u*P-f*w)*N,e[4]=(l*I-a*z-c*S)*N,e[5]=(t*z-i*I+r*S)*N,e[6]=(m*_-p*P-g*M)*N,e[7]=(h*P-d*_+f*M)*N,e[8]=(a*G-o*I+c*b)*N,e[9]=(n*I-t*G-r*b)*N,e[10]=(p*E-x*_+g*y)*N,e[11]=(u*_-h*E-f*y)*N,e[12]=(o*S-a*B-l*b)*N,e[13]=(t*B-n*S+i*b)*N,e[14]=(x*M-p*w-m*y)*N,e[15]=(h*w-u*M+d*y)*N,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,p=r*u,x=a*h,m=a*u,g=o*u,y=l*c,M=l*h,_=l*u,w=n.x,E=n.y,P=n.z;return i[0]=(1-(x+g))*w,i[1]=(f+_)*w,i[2]=(p-M)*w,i[3]=0,i[4]=(f-_)*E,i[5]=(1-(d+g))*E,i[6]=(m+y)*E,i[7]=0,i[8]=(p+M)*P,i[9]=(m-y)*P,i[10]=(1-(d+x))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Ar.set(i[0],i[1],i[2]).length(),o=Ar.set(i[4],i[5],i[6]).length(),l=Ar.set(i[8],i[9],i[10]).length();r<0&&(a=-a),ii.copy(this);let c=1/a,h=1/o,u=1/l;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=h,ii.elements[5]*=h,ii.elements[6]*=h,ii.elements[8]*=u,ii.elements[9]*=u,ii.elements[10]*=u,t.setFromRotationMatrix(ii),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Dn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===Dn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ds)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Dn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===Dn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===ds)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ru.prototype.isMatrix4=!0;var Qe=Ru,Ar=new L,ii=new Qe,T_=new L(0,0,0),A_=new L(1,1,1),ss=new L,Bc=new L,Bn=new L,mm=new Qe,gm=new Gt,Jn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gm.setFromEuler(this),this.setFromQuaternion(gm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var Zs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},C_=0,xm=new L,Cr=new Gt,Ui=new Qe,zc=new L,io=new L,R_=new L,P_=new Gt,_m=new L(1,0,0),ym=new L(0,1,0),vm=new L(0,0,1),bm={type:"added"},I_={type:"removed"},Rr={type:"childadded",child:null},Id={type:"childremoved",child:null},pt=class s extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new L,t=new Jn,n=new Gt,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new tt}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(_m,e)}rotateY(e){return this.rotateOnAxis(ym,e)}rotateZ(e){return this.rotateOnAxis(vm,e)}translateOnAxis(e,t){return xm.copy(e).applyQuaternion(this.quaternion),this.position.add(xm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_m,e)}translateY(e){return this.translateOnAxis(ym,e)}translateZ(e){return this.translateOnAxis(vm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zc.copy(e):zc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(io,zc,this.up):Ui.lookAt(zc,io,this.up),this.quaternion.setFromRotationMatrix(Ui),i&&(Ui.extractRotation(i.matrixWorld),Cr.setFromRotationMatrix(Ui),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bm),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(I_),Id.child=e,this.dispatchEvent(Id),Id.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bm),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,R_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,P_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};pt.DEFAULT_UP=new L(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var li=class extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},L_={type:"move"},Js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(L_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new li;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},_0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},Vc={h:0,s:0,l:0};function Ld(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=lt.workingColorSpace){if(e=ap(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ld(a,r,e+1/3),this.g=Ld(a,r,e),this.b=Ld(a,r,e-1/3)}return lt.colorSpaceToWorking(this,i),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let n=_0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return lt.workingToColorSpace(un.copy(this),e),Math.round(et(un.r*255,0,255))*65536+Math.round(et(un.g*255,0,255))*256+Math.round(et(un.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(un.copy(this),t);let n=un.r,i=un.g,r=un.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=Qt){lt.workingToColorSpace(un.copy(this),e);let t=un.r,n=un.g,i=un.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+t,rs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(rs),e.getHSL(Vc);let n=vo(rs.h,Vc.h,t),i=vo(rs.s,Vc.s,t),r=vo(rs.l,Vc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new ze;ze.NAMES=_0;var Do=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ze(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},Uo=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ks=class extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},si=new L,Ni=new L,Dd=new L,Fi=new L,Pr=new L,Ir=new L,Mm=new L,Ud=new L,Nd=new L,Fd=new L,Od=new ut,Bd=new ut,zd=new ut,oi=class s{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),si.subVectors(e,t),i.cross(si);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){si.subVectors(i,t),Ni.subVectors(n,t),Dd.subVectors(e,t);let a=si.dot(si),o=si.dot(Ni),l=si.dot(Dd),c=Ni.dot(Ni),h=Ni.dot(Dd),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fi.x),l.addScaledVector(a,Fi.y),l.addScaledVector(o,Fi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Od.setScalar(0),Bd.setScalar(0),zd.setScalar(0),Od.fromBufferAttribute(e,t),Bd.fromBufferAttribute(e,n),zd.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Od,r.x),a.addScaledVector(Bd,r.y),a.addScaledVector(zd,r.z),a}static isFrontFacing(e,t,n,i){return si.subVectors(n,t),Ni.subVectors(e,t),si.cross(Ni).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),si.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Pr.subVectors(i,n),Ir.subVectors(r,n),Ud.subVectors(e,n);let l=Pr.dot(Ud),c=Ir.dot(Ud);if(l<=0&&c<=0)return t.copy(n);Nd.subVectors(e,i);let h=Pr.dot(Nd),u=Ir.dot(Nd);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Pr,a);Fd.subVectors(e,r);let f=Pr.dot(Fd),p=Ir.dot(Fd);if(p>=0&&f<=p)return t.copy(r);let x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ir,o);let m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return Mm.subVectors(r,i),o=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(Mm,o);let g=1/(m+x+d);return a=x*g,o=d*g,t.copy(n).addScaledVector(Pr,a).addScaledVector(Ir,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pt=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ri):ri.fromBufferAttribute(r,a),ri.applyMatrix4(e.matrixWorld),this.expandByPoint(ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),kc.copy(n.boundingBox)),kc.applyMatrix4(e.matrixWorld),this.union(kc)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ri),ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(so),Gc.subVectors(this.max,so),Lr.subVectors(e.a,so),Dr.subVectors(e.b,so),Ur.subVectors(e.c,so),as.subVectors(Dr,Lr),os.subVectors(Ur,Dr),Ls.subVectors(Lr,Ur);let t=[0,-as.z,as.y,0,-os.z,os.y,0,-Ls.z,Ls.y,as.z,0,-as.x,os.z,0,-os.x,Ls.z,0,-Ls.x,-as.y,as.x,0,-os.y,os.x,0,-Ls.y,Ls.x,0];return!Vd(t,Lr,Dr,Ur,Gc)||(t=[1,0,0,0,1,0,0,0,1],!Vd(t,Lr,Dr,Ur,Gc))?!1:(Hc.crossVectors(as,os),t=[Hc.x,Hc.y,Hc.z],Vd(t,Lr,Dr,Ur,Gc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Oi=[new L,new L,new L,new L,new L,new L,new L,new L],ri=new L,kc=new Pt,Lr=new L,Dr=new L,Ur=new L,as=new L,os=new L,Ls=new L,so=new L,Gc=new L,Hc=new L,Ds=new L;function Vd(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ds.fromArray(s,r);let o=i.x*Math.abs(Ds.x)+i.y*Math.abs(Ds.y)+i.z*Math.abs(Ds.z),l=e.dot(Ds),c=t.dot(Ds),h=n.dot(Ds);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Vi=D_();function D_(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function In(s){Math.abs(s)>65504&&De("DataUtils.toHalfFloat(): Value out of range."),s=et(s,-65504,65504),Vi.floatView[0]=s;let e=Vi.uint32View[0],t=e>>23&511;return Vi.baseTable[t]+((e&8388607)>>Vi.shiftTable[t])}function go(s){let e=s>>10;return Vi.uint32View[0]=Vi.mantissaTable[Vi.offsetTable[e]+(s&1023)]+Vi.exponentTable[e],Vi.floatView[0]}var Lh=class{static toHalfFloat(e){return In(e)}static fromHalfFloat(e){return go(e)}},Wt=new L,Wc=new Me,U_=0,vt=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:U_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wc,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wc.fromBufferAttribute(this,t),Wc.applyMatrix3(e),this.setXY(t,Wc.x,Wc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},Dh=class extends vt{constructor(e,t,n){super(new Int8Array(e),t,n)}},Uh=class extends vt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},Nh=class extends vt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},Fh=class extends vt{constructor(e,t,n){super(new Int16Array(e),t,n)}},ia=class extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Oh=class extends vt{constructor(e,t,n){super(new Int32Array(e),t,n)}},sa=class extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Bh=class extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=go(this.array[e*this.itemSize]);return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=In(t),this}getY(e){let t=go(this.array[e*this.itemSize+1]);return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=In(t),this}getZ(e){let t=go(this.array[e*this.itemSize+2]);return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=In(t),this}getW(e){let t=go(this.array[e*this.itemSize+3]);return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=In(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this.array[e+2]=In(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.array[e+0]=In(t),this.array[e+1]=In(n),this.array[e+2]=In(i),this.array[e+3]=In(r),this}},Ve=class extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}},N_=new Pt,ro=new L,kd=new L,It=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):N_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ro.subVectors(e,this.center);let t=ro.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ro,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ro.copy(e.center).add(kd)),this.expandByPoint(ro.copy(e.center).sub(kd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},F_=0,$n=new Qe,Gd=new pt,Nr=new L,zn=new Pt,ao=new Pt,Kt=new L,it=class s extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(r_(e)?sa:ia)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,t,n){return $n.makeTranslation(e,t,n),this.applyMatrix4($n),this}scale(e,t,n){return $n.makeScale(e,t,n),this.applyMatrix4($n),this}lookAt(e){return Gd.lookAt(e),Gd.updateMatrix(),this.applyMatrix4(Gd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];zn.setFromBufferAttribute(r),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new It);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ao.setFromBufferAttribute(o),this.morphTargetsRelative?(Kt.addVectors(zn.min,ao.min),zn.expandByPoint(Kt),Kt.addVectors(zn.max,ao.max),zn.expandByPoint(Kt)):(zn.expandByPoint(ao.min),zn.expandByPoint(ao.max))}zn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Kt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Kt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Kt.fromBufferAttribute(o,c),l&&(Nr.fromBufferAttribute(e,c),Kt.add(Nr)),i=Math.max(i,n.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new L,l[b]=new L;let c=new L,h=new L,u=new L,d=new Me,f=new Me,p=new Me,x=new L,m=new L;function g(b,S,I){c.fromBufferAttribute(n,b),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,b),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,I),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let B=1/(f.x*p.y-p.x*f.y);isFinite(B)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(B),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(B),o[b].add(x),o[S].add(x),o[I].add(x),l[b].add(m),l[S].add(m),l[I].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let b=0,S=y.length;b<S;++b){let I=y[b],B=I.start,G=I.count;for(let z=B,C=B+G;z<C;z+=3)g(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let M=new L,_=new L,w=new L,E=new L;function P(b){w.fromBufferAttribute(i,b),E.copy(w);let S=o[b];M.copy(S),M.sub(w.multiplyScalar(w.dot(S))).normalize(),_.crossVectors(E,S);let B=_.dot(l[b])<0?-1:1;a.setXYZW(b,M.x,M.y,M.z,B)}for(let b=0,S=y.length;b<S;++b){let I=y[b],B=I.start,G=I.count;for(let z=B,C=B+G;z<C;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new vt(d,h,u)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wc,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},bn=new L,mn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ta("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ta("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Hd=new L,O_=new L,B_=new tt,Ln=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Hd.subVectors(n,t).cross(O_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Hd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||B_.getNormalMatrix(e),i=this.coplanarPoint(Hd).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},z_=0,Xt=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=Vn(),this.name="",this.type="Material",this.blending=pr,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uu,this.blendDst=Nu,this.blendEquation=Ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yo,this.stencilZFail=yo,this.stencilZPass=yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Ln().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ps=class extends Xt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fr,oo=new L,Or=new L,Br=new L,zr=new Me,lo=new Me,y0=new Qe,Xc=new L,co=new L,qc=new L,Sm=new Me,Wd=new Me,wm=new Me,Qs=class extends pt{constructor(e=new ps){if(super(),this.isSprite=!0,this.type="Sprite",Fr===void 0){Fr=new it;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new js(t,5);Fr.setIndex([0,1,2,0,2,3]),Fr.setAttribute("position",new mn(n,3,0,!1)),Fr.setAttribute("uv",new mn(n,2,3,!1))}this.geometry=Fr,this.material=e,this.center=new Me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Or.setFromMatrixScale(this.matrixWorld),y0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Br.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Or.multiplyScalar(-Br.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;$c(Xc.set(-.5,-.5,0),Br,a,Or,i,r),$c(co.set(.5,-.5,0),Br,a,Or,i,r),$c(qc.set(.5,.5,0),Br,a,Or,i,r),Sm.set(0,0),Wd.set(1,0),wm.set(1,1);let o=e.ray.intersectTriangle(Xc,co,qc,!1,oo);if(o===null&&($c(co.set(-.5,.5,0),Br,a,Or,i,r),Wd.set(0,1),o=e.ray.intersectTriangle(Xc,qc,co,!1,oo),o===null))return;let l=e.ray.origin.distanceTo(oo);l<e.near||l>e.far||t.push({distance:l,point:oo.clone(),uv:oi.getInterpolation(oo,Xc,co,qc,Sm,Wd,wm,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function $c(s,e,t,n,i,r){zr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(lo.x=r*zr.x-i*zr.y,lo.y=i*zr.x+r*zr.y):lo.copy(zr),s.copy(e),s.x+=lo.x,s.y+=lo.y,s.applyMatrix4(y0)}var Yc=new L,Em=new L,No=class extends pt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Yc.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(Yc);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){Yc.setFromMatrixPosition(e.matrixWorld),Em.setFromMatrixPosition(this.matrixWorld);let n=Yc.distanceTo(Em)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},Bi=new L,Xd=new L,Zc=new L,Jc=new L,ui=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Xd.copy(e).add(t).multiplyScalar(.5),Zc.copy(t).sub(e).normalize(),Jc.copy(this.origin).sub(Xd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Zc),o=Jc.dot(this.direction),l=-Jc.dot(Zc),c=Jc.lengthSq(),h=Math.abs(1-a*a),u,d,f,p;if(h>0)if(u=a*l-o,d=a*o-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Xd).addScaledVector(Zc,d),f}intersectSphere(e,t){if(e.radius<0)return null;Bi.subVectors(e.center,this.origin);let n=Bi.dot(this.direction),i=Bi.dot(Bi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,x=t.y-a.y,m=t.z-a.z,g=n.x-a.x,y=n.y-a.y,M=n.z-a.z,_=Math.abs(l),w=Math.abs(c),E=Math.abs(h),P,b,S,I,B,G,z,C,N,F,V,se;if(_>=w&&_>=E?(S=l,G=u,N=p,se=g,l>=0?(P=c,b=h,I=d,B=f,z=x,C=m,F=y,V=M):(P=h,b=c,I=f,B=d,z=m,C=x,F=M,V=y)):w>=E?(S=c,G=d,N=x,se=y,c>=0?(P=h,b=l,I=f,B=u,z=m,C=p,F=M,V=g):(P=l,b=h,I=u,B=f,z=p,C=m,F=g,V=M)):(S=h,G=f,N=m,se=M,h>=0?(P=l,b=c,I=u,B=d,z=p,C=x,F=g,V=y):(P=c,b=l,I=d,B=u,z=x,C=p,F=y,V=g)),S===0)return null;let J=P/S,Z=b/S,k=1/S,H=I-J*G,D=B-Z*G,ee=z-J*N,O=C-Z*N,ce=F-J*se,q=V-Z*se,$=ce*O-q*ee,Y=H*q-D*ce,ne=ee*D-O*H;if(i){if($<0||Y<0||ne<0)return null}else if(($<0||Y<0||ne<0)&&($>0||Y>0||ne>0))return null;let le=$+Y+ne;if(le===0)return null;let he=k*($*G+Y*N+ne*se);return(le>0?he<0:he>0)?null:this.at(he/le,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},kn=class extends Xt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Tm=new Qe,Us=new ui,Kc=new It,Am=new L,jc=new L,Qc=new L,eh=new L,qd=new L,th=new L,Cm=new L,nh=new L,Et=class extends pt{constructor(e=new it,t=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){th.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(qd.fromBufferAttribute(u,e),a?th.addScaledVector(qd,h):th.addScaledVector(qd.sub(t),h))}t.add(th)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(r),Us.copy(e.ray).recast(e.near),!(Kc.containsPoint(Us.origin)===!1&&(Us.intersectSphere(Kc,Am)===null||Us.origin.distanceToSquared(Am)>(e.far-e.near)**2))&&(Tm.copy(r).invert(),Us.copy(e.ray).applyMatrix4(Tm),!(n.boundingBox!==null&&Us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,w=M;_<w;_+=3){let E=o.getX(_),P=o.getX(_+1),b=o.getX(_+2);i=ih(this,g,e,n,c,h,u,E,P,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let y=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);i=ih(this,a,e,n,c,h,u,y,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=d.length;p<x;p++){let m=d[p],g=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,w=M;_<w;_+=3){let E=_,P=_+1,b=_+2;i=ih(this,g,e,n,c,h,u,E,P,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){let y=m,M=m+1,_=m+2;i=ih(this,a,e,n,c,h,u,y,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function V_(s,e,t,n,i,r,a,o){let l;if(e.side===gn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Zi,o),l===null)return null;nh.copy(o),nh.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(nh);return c<t.near||c>t.far?null:{distance:c,point:nh.clone(),object:s}}function ih(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,jc),s.getVertexPosition(l,Qc),s.getVertexPosition(c,eh);let h=V_(s,e,t,n,jc,Qc,eh,Cm);if(h){let u=new L;oi.getBarycoord(Cm,jc,Qc,eh,u),i&&(h.uv=oi.getInterpolatedAttribute(i,o,l,c,u,new Me)),r&&(h.uv1=oi.getInterpolatedAttribute(r,o,l,c,u,new Me)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new L,materialIndex:0};oi.getNormal(jc,Qc,eh,d.normal),h.face=d,h.barycoord=u}return h}var ho=new ut,Rm=new ut,Pm=new ut,k_=new ut,Im=new Qe,sh=new L,$d=new It,Lm=new Qe,Yd=new ui,Fo=class extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ah,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sh),this.boundingBox.expandByPoint(sh)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new It),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sh),this.boundingSphere.expandByPoint(sh)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$d.copy(this.boundingSphere),$d.applyMatrix4(i),e.ray.intersectsSphere($d)!==!1&&(Lm.copy(i).invert(),Yd.copy(e.ray).applyMatrix4(Lm),!(this.boundingBox!==null&&Yd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Yd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ut,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ah?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===qf?this.bindMatrixInverse.copy(this.bindMatrix).invert():De("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Rm.fromBufferAttribute(i.attributes.skinIndex,e),Pm.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(ho.copy(t),t.set(0,0,0,0)):(ho.set(...t,1),t.set(0,0,0)),ho.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Pm.getComponent(r);if(a!==0){let o=Rm.getComponent(r);Im.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(k_.copy(ho).applyMatrix4(Im),a)}}return t.isVector4&&(t.w=ho.w),t.applyMatrix4(this.bindMatrixInverse)}},ra=class extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},wn=class extends Ot{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Ft,h=Ft,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dm=new Qe,G_=new Qe,Oo=class s{constructor(e=[],t=[]){this.uuid=Vn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){De("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:G_;Dm.multiplyMatrices(o,t[r]),Dm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new wn(t,e,e,pn,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(De("Skeleton: No bone found with UUID:",r),a=new ra),this.bones.push(a),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Gi=class extends vt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Vr=new Qe,Um=new Qe,rh=[],Nm=new Pt,H_=new Qe,uo=new Et,fo=new It,Bo=class extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,H_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vr),Nm.copy(e.boundingBox).applyMatrix4(Vr),this.boundingBox.union(Nm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new It),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vr),fo.copy(e.boundingSphere).applyMatrix4(Vr),this.boundingSphere.union(fo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(n),e.ray.intersectsSphere(fo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Vr),Um.multiplyMatrices(n,Vr),uo.matrixWorld=Um,uo.raycast(e,rh);for(let a=0,o=rh.length;a<o;a++){let l=rh[a];l.instanceId=r,l.object=this,t.push(l)}rh.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new wn(new Float32Array(i*this.count),i,this.count,Gl,fn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ns=new It,W_=new Me(.5,.5),ah=new L,wi=class{constructor(e=new Ln,t=new Ln,n=new Ln,i=new Ln,r=new Ln,a=new Ln){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],x=r[9],m=r[10],g=r[11],y=r[12],M=r[13],_=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,g-p,w-y).normalize(),i[1].setComponents(c+a,f+h,g+p,w+y).normalize(),i[2].setComponents(c+o,f+u,g+x,w+M).normalize(),i[3].setComponents(c-o,f-u,g-x,w-M).normalize(),n)i[4].setComponents(l,d,m,_).normalize(),i[5].setComponents(c-l,f-d,g-m,w-_).normalize();else if(i[4].setComponents(c-l,f-d,g-m,w-_).normalize(),t===Dn)i[5].setComponents(c+l,f+d,g+m,w+_).normalize();else if(t===ds)i[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(e){Ns.center.set(0,0,0);let t=W_.distanceTo(e.center);return Ns.radius=.7071067811865476+t,Ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ah.x=i.normal.x>0?e.max.x:e.min.x,ah.y=i.normal.y>0?e.max.y:e.min.y,ah.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ah)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fm=new Qe,zo=class s{constructor(){this.coordinateSystem=Dn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Fm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new wi),n[i].setFromProjectionMatrix(Fm,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new wi),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function Zd(s,e){return s-e}function X_(s,e){return s.z-e.z}function q_(s,e){return e.z-s.z}var hf=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Pn=new Qe,$_=new ze(1,1,1),Y_=new wi,Z_=new zo,oh=new Pt,Fs=new It,po=new L,Om=new L,J_=new L,Jd=new hf,dn=new Et,lh=[];function K_(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,s.getComponent(r,a))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Os(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var Vo=class extends Et{constructor(e,t,n=t*2,i){super(new it,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new wn(t,e,e,pn,fn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new wn(t,e,e,Ba,Hn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new wn(t,e,e,pn,fn);n.colorSpace=lt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,h=new o.constructor(n*l),u=new vt(h,l,c);t.setAttribute(r,u)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new vt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pt);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Pn),this.getBoundingBoxAt(r,oh).applyMatrix4(Pn),e.union(oh)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new It);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Pn),this.getBoundingSphereAt(r,Fs).applyMatrix4(Pn),e.union(Fs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Zd),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;Pn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let a=this._colorsTexture;return a&&($_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Zd),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let u=t.getAttribute(h),d=n.getAttribute(h);K_(u,d,l);let f=u.itemSize;for(let p=u.count,x=c;p<x;p++){let m=l+p;for(let g=0;g<f;g++)d.setComponent(m,g,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){let h=o.indexStart,u=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)r.setX(h+d,l+a.getX(d));for(let d=a.count,f=u;d<f;d++)r.setX(h+d,l);r.needsUpdate=!0,r.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=i[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=r.index,p=f.array,x=e-u;for(let m=h;m<h+d;m++)p[m]=p[m]+x;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:u}=c,d=r.attributes;for(let f in d){let p=d[f],{array:x,itemSize:m}=p;x.copyWithin(e*m,h*m,(h+u)*m),p.addUpdateRange(e*m,u*m),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new Pt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;a&&(h=a.getX(h)),r.expandByPoint(po.fromBufferAttribute(o,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new It;this.getBoundingBoxAt(e,oh),oh.getCenter(r.center);let a=n.index,o=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;a&&(u=a.getX(u)),po.fromBufferAttribute(o,u),l=Math.max(l,r.center.distanceToSquared(po))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Zd);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);Os(this._multiDrawCounts,i),Os(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Os(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Os(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Os(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new it,this._initializeGeometry(r));let a=this.geometry;r.index&&Os(r.index.array,a.index.array);for(let o in r.attributes)Os(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,a=this.geometry;dn.material=this.material,dn.geometry.index=a.index,dn.geometry.attributes=a.attributes,dn.geometry.boundingBox===null&&(dn.geometry.boundingBox=new Pt),dn.geometry.boundingSphere===null&&(dn.geometry.boundingSphere=new It);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,h=i[c];dn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,dn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,dn.geometry.boundingBox),this.getBoundingSphereAt(c,dn.geometry.boundingSphere),dn.raycast(e,lh);for(let u=0,d=lh.length;u<d;u++){let f=lh[u];f.object=this,f.batchId=o,t.push(f)}lh.length=0}dn.material=null,dn.geometry.index=null,dn.geometry.attributes={},dn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=i.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,u=this._multiDrawCounts,d=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,x=p.image.data,m=n.isArrayCamera?Z_:Y_;f&&(n.isArrayCamera?m.setFromArrayCamera(n):(Pn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),m.setFromProjectionMatrix(Pn,n.coordinateSystem,n.reversedDepth)));let g=0;if(this.sortObjects){Pn.copy(this.matrixWorld).invert(),po.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Pn),Om.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Pn);for(let _=0,w=c.length;_<w;_++)if(c[_].visible&&c[_].active){let E=c[_].geometryIndex;this.getMatrixAt(_,Pn),this.getBoundingSphereAt(E,Fs).applyMatrix4(Pn);let P=!1;if(f&&(P=!m.intersectsSphere(Fs)),!P){let b=d[E],S=J_.subVectors(Fs.center,po).dot(Om);Jd.push(b.start,b.count,S,_)}}let y=Jd.list,M=this.customSort;M===null?y.sort(r.transparent?q_:X_):M.call(this,y,n);for(let _=0,w=y.length;_<w;_++){let E=y[_];h[g]=E.start*o*l,u[g]=E.count*l,x[g]=E.index,g++}Jd.reset()}else for(let y=0,M=c.length;y<M;y++)if(c[y].visible&&c[y].active){let _=c[y].geometryIndex,w=!1;if(f&&(this.getMatrixAt(y,Pn),this.getBoundingSphereAt(_,Fs).applyMatrix4(Pn),w=!m.intersectsSphere(Fs)),!w){let E=d[_];h[g]=E.start*o*l,u[g]=E.count*l,x[g]=y,g++}}p.needsUpdate=!0,this._multiDrawCount=g,this._multiDrawBytesPerElement=o,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,a){this.onBeforeRender(e,null,i,r,a)}},jt=class extends Xt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zh=new L,Vh=new L,Bm=new Qe,mo=new ui,ch=new It,Kd=new L,zm=new L,di=class extends pt{constructor(e=new it,t=new jt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)zh.fromBufferAttribute(t,i-1),Vh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=zh.distanceTo(Vh);e.setAttribute("lineDistance",new Ve(n,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ch.copy(n.boundingSphere),ch.applyMatrix4(i),ch.radius+=r,e.ray.intersectsSphere(ch)===!1)return;Bm.copy(i).invert(),mo.copy(e.ray).applyMatrix4(Bm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=c){let g=h.getX(x),y=h.getX(x+1),M=hh(this,e,mo,l,g,y,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(p-1),m=h.getX(f),g=hh(this,e,mo,l,x,m,p-1);g&&t.push(g)}}else{let f=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=f,m=p-1;x<m;x+=c){let g=hh(this,e,mo,l,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=hh(this,e,mo,l,p-1,f,p-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function hh(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(zh.fromBufferAttribute(o,i),Vh.fromBufferAttribute(o,r),t.distanceSqToSegment(zh,Vh,Kd,zm)>n)return;Kd.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Kd);if(!(c<e.near||c>e.far))return{distance:c,point:zm.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Vm=new L,km=new L,Gn=class extends di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Vm.fromBufferAttribute(t,i),km.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Vm.distanceTo(km);e.setAttribute("lineDistance",new Ve(n,1))}else De("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ko=class extends di{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},aa=class extends Xt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gm=new Qe,uf=new ui,uh=new It,dh=new L,Go=class extends pt{constructor(e=new it,t=new aa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uh.copy(n.boundingSphere),uh.applyMatrix4(i),uh.radius+=r,e.ray.intersectsSphere(uh)===!1)return;Gm.copy(i).invert(),uf.copy(e.ray).applyMatrix4(Gm);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=d,x=f;p<x;p++){let m=c.getX(p);dh.fromBufferAttribute(u,m),Hm(dh,m,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let p=d,x=f;p<x;p++)dh.fromBufferAttribute(u,p),Hm(dh,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Hm(s,e,t,n,i,r,a){let o=uf.distanceSqToPoint(s);if(o<t){let l=new L;uf.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ho=class extends Ot{constructor(e,t,n,i,r=Ct,a=Ct,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function u(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},kh=class extends Ho{constructor(e,t,n,i,r,a,o,l){super({},e,t,n,i,r,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},Gh=class extends Ot{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Ft,this.minFilter=Ft,this.generateMipmaps=!1,this.needsUpdate=!0}},er=class extends Ot{constructor(e,t,n,i,r,a,o,l,c,h,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Hh=class extends er{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Sn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Wh=class extends er{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,gi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},ms=class extends Ot{constructor(e=[],t=gi,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},oa=class extends Ot{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xh=class extends Ot{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},Hi=class extends Ot{constructor(e,t,n=Hn,i,r,a,o=Ft,l=Ft,c,h=hi,u=1){if(h!==hi&&h!==Ki)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Wo=class extends Hi{constructor(e,t=Hn,n=gi,i,r,a=Ft,o=Ft,l,c=hi){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},la=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gs=class s extends it{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(u,2));function p(x,m,g,y,M,_,w,E,P,b,S){let I=_/P,B=w/b,G=_/2,z=w/2,C=E/2,N=P+1,F=b+1,V=0,se=0,J=new L;for(let Z=0;Z<F;Z++){let k=Z*B-z;for(let H=0;H<N;H++){let D=H*I-G;J[x]=D*y,J[m]=k*M,J[g]=C,c.push(J.x,J.y,J.z),J[x]=0,J[m]=0,J[g]=E>0?1:-1,h.push(J.x,J.y,J.z),u.push(H/P),u.push(1-Z/b),V+=1}}for(let Z=0;Z<b;Z++)for(let k=0;k<P;k++){let H=d+k+N*Z,D=d+k+N*(Z+1),ee=d+(k+1)+N*(Z+1),O=d+(k+1)+N*Z;l.push(H,D,O),l.push(D,ee,O),se+=6}o.addGroup(f,se,S),f+=se,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Xo=class s extends it{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+r,x=i+1,m=new L,g=new L;for(let y=0;y<=p;y++){let M=0,_=0,w=0,E=0;if(y<=n){let S=y/n,I=S*Math.PI/2;_=-h-e*Math.cos(I),w=e*Math.sin(I),E=-e*Math.cos(I),M=S*u}else if(y<=n+r){let S=(y-n)/r;_=-h+S*t,w=e,E=0,M=u+S*d}else{let S=(y-n-r)/n,I=S*Math.PI/2;_=h+e*Math.sin(I),w=e*Math.cos(I),E=e*Math.sin(I),M=u+d+S*u}let P=Math.max(0,Math.min(1,M/f)),b=0;y===0?b=.5/i:y===p&&(b=-.5/i);for(let S=0;S<=i;S++){let I=S/i,B=I*Math.PI*2,G=Math.sin(B),z=Math.cos(B);g.x=-w*z,g.y=_,g.z=w*G,o.push(g.x,g.y,g.z),m.set(-w*z,E,w*G),m.normalize(),l.push(m.x,m.y,m.z),c.push(I+b,P)}if(y>0){let S=(y-1)*x;for(let I=0;I<i;I++){let B=S+I,G=S+I+1,z=y*x+I,C=y*x+I+1;a.push(B,G,z),a.push(G,C,z)}}}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},qo=class s extends it{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new L,h=new Me;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ca=class s extends it{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,x=[],m=n/2,g=0;y(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Ve(u,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function y(){let _=new L,w=new L,E=0,P=(t-e)/n;for(let b=0;b<=r;b++){let S=[],I=b/r,B=I*(t-e)+e;for(let G=0;G<=i;G++){let z=G/i,C=z*l+o,N=Math.sin(C),F=Math.cos(C);w.x=B*N,w.y=-I*n+m,w.z=B*F,u.push(w.x,w.y,w.z),_.set(N,P,F).normalize(),d.push(_.x,_.y,_.z),f.push(z,1-I),S.push(p++)}x.push(S)}for(let b=0;b<i;b++)for(let S=0;S<r;S++){let I=x[S][b],B=x[S+1][b],G=x[S+1][b+1],z=x[S][b+1];(e>0||S!==0)&&(h.push(I,B,z),E+=3),(t>0||S!==r-1)&&(h.push(B,G,z),E+=3)}c.addGroup(g,E,0),g+=E}function M(_){let w=p,E=new Me,P=new L,b=0,S=_===!0?e:t,I=_===!0?1:-1;for(let G=1;G<=i;G++)u.push(0,m*I,0),d.push(0,I,0),f.push(.5,.5),p++;let B=p;for(let G=0;G<=i;G++){let C=G/i*l+o,N=Math.cos(C),F=Math.sin(C);P.x=S*F,P.y=m*I,P.z=S*N,u.push(P.x,P.y,P.z),d.push(0,I,0),E.x=N*.5+.5,E.y=F*.5*I+.5,f.push(E.x,E.y),p++}for(let G=0;G<i;G++){let z=w+G,C=B+G;_===!0?h.push(C,C+1,z):h.push(C+1,C,z),b+=3}c.addGroup(g,b,_===!0?1:2),g+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},xs=class s extends ca{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wi=class s extends it{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let M=new L,_=new L,w=new L;for(let E=0;E<t.length;E+=3)f(t[E+0],M),f(t[E+1],_),f(t[E+2],w),l(M,_,w,y)}function l(y,M,_,w){let E=w+1,P=[];for(let b=0;b<=E;b++){P[b]=[];let S=y.clone().lerp(_,b/E),I=M.clone().lerp(_,b/E),B=E-b;for(let G=0;G<=B;G++)G===0&&b===E?P[b][G]=S:P[b][G]=S.clone().lerp(I,G/B)}for(let b=0;b<E;b++)for(let S=0;S<2*(E-b)-1;S++){let I=Math.floor(S/2);S%2===0?(d(P[b][I+1]),d(P[b+1][I]),d(P[b][I])):(d(P[b][I+1]),d(P[b+1][I+1]),d(P[b+1][I]))}}function c(y){let M=new L;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(y),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){let y=new L;for(let M=0;M<r.length;M+=3){y.x=r[M+0],y.y=r[M+1],y.z=r[M+2];let _=m(y)/2/Math.PI+.5,w=g(y)/Math.PI+.5;a.push(_,1-w)}p(),u()}function u(){for(let y=0;y<a.length;y+=6){let M=a[y+0],_=a[y+2],w=a[y+4],E=Math.max(M,_,w),P=Math.min(M,_,w);E>.9&&P<.1&&(M<.2&&(a[y+0]+=1),_<.2&&(a[y+2]+=1),w<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,M){let _=y*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function p(){let y=new L,M=new L,_=new L,w=new L,E=new Me,P=new Me,b=new Me;for(let S=0,I=0;S<r.length;S+=9,I+=6){y.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),E.set(a[I+0],a[I+1]),P.set(a[I+2],a[I+3]),b.set(a[I+4],a[I+5]),w.copy(y).add(M).add(_).divideScalar(3);let B=m(w);x(E,I+0,y,B),x(P,I+2,M,B),x(b,I+4,_,B)}}function x(y,M,_,w){w<0&&y.x===1&&(a[M]=y.x-1),_.x===0&&_.z===0&&(a[M]=w/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function g(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},$o=class s extends Wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},fh=new L,ph=new L,jd=new L,mh=new oi,Yo=class extends it{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Ws*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:x,b:m,c:g}=mh;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),mh.getNormal(jd),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let M=(y+1)%3,_=u[y],w=u[M],E=mh[h[y]],P=mh[h[M]],b=`${_}_${w}`,S=`${w}_${_}`;S in d&&d[S]?(jd.dot(d[S].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(P.x,P.y,P.z)),d[S]=null):b in d||(d[b]={index0:c[y],index1:c[M],normal:jd.clone()})}}for(let p in d)if(d[p]){let{index0:x,index1:m}=d[p];fh.fromBufferAttribute(o,x),ph.fromBufferAttribute(o,m),f.push(fh.x,fh.y,fh.z),f.push(ph.x,ph.y,ph.z)}this.setAttribute("position",new Ve(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){De("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new Me:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,i=[],r=[],a=[],o=new L,l=new Qe;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(et(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(et(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},tr=class extends Nn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Me){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Zo=class extends tr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function op(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var Wm=new L,Xm=new L,Qd=new op,ef=new op,tf=new op,Jo=class extends Nn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Xm.subVectors(i[0],i[1]).add(i[0]),c=Xm);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Wm.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Wm),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),Qd.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,x,m),ef.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,x,m),tf.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(Qd.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ef.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),tf.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Qd.calc(l),ef.calc(l),tf.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function qm(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function j_(s,e){let t=1-s;return t*t*e}function Q_(s,e){return 2*(1-s)*s*e}function ey(s,e){return s*s*e}function bo(s,e,t,n){return j_(s,e)+Q_(s,t)+ey(s,n)}function ty(s,e){let t=1-s;return t*t*t*e}function ny(s,e){let t=1-s;return 3*t*t*s*e}function iy(s,e){return 3*(1-s)*s*s*e}function sy(s,e){return s*s*s*e}function Mo(s,e,t,n,i){return ty(s,e)+ny(s,t)+iy(s,n)+sy(s,i)}var ha=class extends Nn{constructor(e=new Me,t=new Me,n=new Me,i=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Me){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Mo(e,i.x,r.x,a.x,o.x),Mo(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ko=class extends Nn{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Mo(e,i.x,r.x,a.x,o.x),Mo(e,i.y,r.y,a.y,o.y),Mo(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ua=class extends Nn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jo=class extends Nn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},da=class extends Nn{constructor(e=new Me,t=new Me,n=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Me){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(bo(e,i.x,r.x,a.x),bo(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},fa=class extends Nn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(bo(e,i.x,r.x,a.x),bo(e,i.y,r.y,a.y),bo(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},pa=class extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(qm(o,l.x,c.x,h.x,u.x),qm(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Me().fromArray(i))}return this}},qh=Object.freeze({__proto__:null,ArcCurve:Zo,CatmullRomCurve3:Jo,CubicBezierCurve:ha,CubicBezierCurve3:Ko,EllipseCurve:tr,LineCurve:ua,LineCurve3:jo,QuadraticBezierCurve:da,QuadraticBezierCurve3:fa,SplineCurve:pa}),Qo=class extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new qh[i.type]().fromJSON(i))}return this}},_s=class extends Qo{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ua(this.currentPoint.clone(),new Me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new da(this.currentPoint.clone(),new Me(e,t),new Me(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new ha(this.currentPoint.clone(),new Me(e,t),new Me(n,i),new Me(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new pa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){let c=new tr(e,t,n,i,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ys=class extends _s{constructor(e){super(e),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new _s().fromJSON(i))}return this}};function ry(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=v0(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=hy(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,u=l;for(let d=t;d<i;d+=t){let f=s[d],p=s[d+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return el(r,a,t,o,l,c,0),a}function v0(s,e,t,n,i){let r;if(i===by(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=$m(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=$m(a/n|0,s[a],s[a+1],r);return r&&ma(r,r.next)&&(nl(r),r=r.next),r}function nr(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ma(t,t.next)||Dt(t.prev,t,t.next)===0)){if(nl(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function el(s,e,t,n,i,r,a){if(!s)return;!a&&r&&my(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?oy(s,n,i,r):ay(s)){e.push(l.i,s.i,c.i),nl(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=ly(nr(s),e),el(s,e,t,n,i,r,2)):a===2&&cy(s,e,t,n,i,r):el(nr(s),e,t,n,i,r,1);break}}}function ay(s){let e=s.prev,t=s,n=s.next;if(Dt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),d=Math.max(i,r,a),f=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&xo(i,o,r,l,a,c,p.x,p.y)&&Dt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function oy(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Dt(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=Math.min(o,l,c),p=Math.min(h,u,d),x=Math.max(o,l,c),m=Math.max(h,u,d),g=df(f,p,e,t,n),y=df(x,m,e,t,n),M=s.prevZ,_=s.nextZ;for(;M&&M.z>=g&&_&&_.z<=y;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=m&&M!==i&&M!==a&&xo(o,h,l,u,c,d,M.x,M.y)&&Dt(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=f&&_.x<=x&&_.y>=p&&_.y<=m&&_!==i&&_!==a&&xo(o,h,l,u,c,d,_.x,_.y)&&Dt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=g;){if(M.x>=f&&M.x<=x&&M.y>=p&&M.y<=m&&M!==i&&M!==a&&xo(o,h,l,u,c,d,M.x,M.y)&&Dt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=y;){if(_.x>=f&&_.x<=x&&_.y>=p&&_.y<=m&&_!==i&&_!==a&&xo(o,h,l,u,c,d,_.x,_.y)&&Dt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ly(s,e){let t=s;do{let n=t.prev,i=t.next.next;!ma(n,i)&&M0(n,t,t.next,i)&&tl(n,i)&&tl(i,n)&&(e.push(n.i,t.i,i.i),nl(t),nl(t.next),t=s=i),t=t.next}while(t!==s);return nr(t)}function cy(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&_y(a,o)){let l=S0(a,o);a=nr(a,a.next),l=nr(l,l.next),el(a,e,t,n,i,r,0),el(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function hy(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=v0(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(xy(c))}i.sort(uy);for(let r=0;r<i.length;r++)t=dy(i[r],t);return t}function uy(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function dy(s,e){let t=fy(s,e);if(!t)return e;let n=S0(t,s);return nr(n,n.next),nr(t,t.next)}function fy(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(ma(s,t))return t;do{if(ma(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&b0(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);tl(t,s)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&py(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function py(s,e){return Dt(s.prev,s,e.prev)<0&&Dt(e.next,s,s.next)<0}function my(s,e,t,n){let i=s;do i.z===0&&(i.z=df(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,gy(i)}function gy(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function df(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function xy(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function b0(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function xo(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&b0(s,e,t,n,i,r,a,o)}function _y(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!yy(s,e)&&(tl(s,e)&&tl(e,s)&&vy(s,e)&&(Dt(s.prev,s,e.prev)||Dt(s,e.prev,e))||ma(s,e)&&Dt(s.prev,s,s.next)>0&&Dt(e.prev,e,e.next)>0)}function Dt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ma(s,e){return s.x===e.x&&s.y===e.y}function M0(s,e,t,n){let i=xh(Dt(s,e,t)),r=xh(Dt(s,e,n)),a=xh(Dt(t,n,s)),o=xh(Dt(t,n,e));return!!(i!==r&&a!==o||i===0&&gh(s,t,e)||r===0&&gh(s,n,e)||a===0&&gh(t,s,n)||o===0&&gh(t,e,n))}function gh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function xh(s){return s>0?1:s<0?-1:0}function yy(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&M0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function tl(s,e){return Dt(s.prev,s,s.next)<0?Dt(s,e,s.next)>=0&&Dt(s,s.prev,e)>=0:Dt(s,e,s.prev)<0||Dt(s,s.next,e)<0}function vy(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function S0(s,e){let t=ff(s.i,s.x,s.y),n=ff(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function $m(s,e,t,n){let i=ff(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function nl(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ff(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function by(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var pf=class{static triangulate(e,t,n=2){return ry(e,t,n)}},Zn=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Ym(e),Zm(n,e);let a=e.length;t.forEach(Ym);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,Zm(n,t[l]);let o=pf.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Ym(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Zm(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var il=class s extends it{constructor(e=new ys([new Me(.5,.5),new Me(-.5,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new Ve(i,3)),this.setAttribute("uv",new Ve(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:My,M,_=!1,w,E,P,b;if(g){M=g.getSpacedPoints(h),_=!0,d=!1;let re=g.isCatmullRomCurve3?g.closed:!1;w=g.computeFrenetFrames(h,re),E=new L,P=new L,b=new L}d||(m=0,f=0,p=0,x=0);let S=o.extractPoints(c),I=S.shape,B=S.holes;if(!Zn.isClockWise(I)){I=I.reverse();for(let re=0,ie=B.length;re<ie;re++){let pe=B[re];Zn.isClockWise(pe)&&(B[re]=pe.reverse())}}function z(re){let pe=10000000000000001e-36,ve=re[0];for(let we=1;we<=re.length;we++){let ke=we%re.length,Ue=re[ke],Re=Ue.x-ve.x,Q=Ue.y-ve.y,U=Re*Re+Q*Q,Te=Math.max(Math.abs(Ue.x),Math.abs(Ue.y),Math.abs(ve.x),Math.abs(ve.y)),ye=pe*Te*Te;if(U<=ye){re.splice(ke,1),we--;continue}ve=Ue}}z(I),B.forEach(z);let C=B.length,N=I;for(let re=0;re<C;re++){let ie=B[re];I=I.concat(ie)}function F(re,ie,pe){return ie||Je("ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(ie,pe)}let V=I.length;function se(re,ie,pe){let ve,we,ke,Ue=re.x-ie.x,Re=re.y-ie.y,Q=pe.x-re.x,U=pe.y-re.y,Te=Ue*Ue+Re*Re,ye=Ue*U-Re*Q;if(Math.abs(ye)>Number.EPSILON){let R=Math.sqrt(Te),v=Math.sqrt(Q*Q+U*U),X=ie.x-Re/R,W=ie.y+Ue/R,te=pe.x-U/v,_e=pe.y+Q/v,xe=((te-X)*U-(_e-W)*Q)/(Ue*U-Re*Q);ve=X+Ue*xe-re.x,we=W+Re*xe-re.y;let ae=ve*ve+we*we;if(ae<=2)return new Me(ve,we);ke=Math.sqrt(ae/2)}else{let R=!1;Ue>Number.EPSILON?Q>Number.EPSILON&&(R=!0):Ue<-Number.EPSILON?Q<-Number.EPSILON&&(R=!0):Math.sign(Re)===Math.sign(U)&&(R=!0),R?(ve=-Re,we=Ue,ke=Math.sqrt(Te)):(ve=Ue,we=Re,ke=Math.sqrt(Te/2))}return new Me(ve/ke,we/ke)}let J=[];for(let re=0,ie=N.length,pe=ie-1,ve=re+1;re<ie;re++,pe++,ve++)pe===ie&&(pe=0),ve===ie&&(ve=0),J[re]=se(N[re],N[pe],N[ve]);let Z=[],k,H=J.concat();for(let re=0,ie=C;re<ie;re++){let pe=B[re];k=[];for(let ve=0,we=pe.length,ke=we-1,Ue=ve+1;ve<we;ve++,ke++,Ue++)ke===we&&(ke=0),Ue===we&&(Ue=0),k[ve]=se(pe[ve],pe[ke],pe[Ue]);Z.push(k),H=H.concat(k)}let D;if(m===0)D=Zn.triangulateShape(N,B);else{let re=[],ie=[];for(let pe=0;pe<m;pe++){let ve=pe/m,we=f*Math.cos(ve*Math.PI/2),ke=p*Math.sin(ve*Math.PI/2)+x;for(let Ue=0,Re=N.length;Ue<Re;Ue++){let Q=F(N[Ue],J[Ue],ke);Y(Q.x,Q.y,-we),ve===0&&re.push(Q)}for(let Ue=0,Re=C;Ue<Re;Ue++){let Q=B[Ue];k=Z[Ue];let U=[];for(let Te=0,ye=Q.length;Te<ye;Te++){let R=F(Q[Te],k[Te],ke);Y(R.x,R.y,-we),ve===0&&U.push(R)}ve===0&&ie.push(U)}}D=Zn.triangulateShape(re,ie)}let ee=D.length,O=p+x;for(let re=0;re<V;re++){let ie=d?F(I[re],H[re],O):I[re];_?(P.copy(w.normals[0]).multiplyScalar(ie.x),E.copy(w.binormals[0]).multiplyScalar(ie.y),b.copy(M[0]).add(P).add(E),Y(b.x,b.y,b.z)):Y(ie.x,ie.y,0)}for(let re=1;re<=h;re++)for(let ie=0;ie<V;ie++){let pe=d?F(I[ie],H[ie],O):I[ie];_?(P.copy(w.normals[re]).multiplyScalar(pe.x),E.copy(w.binormals[re]).multiplyScalar(pe.y),b.copy(M[re]).add(P).add(E),Y(b.x,b.y,b.z)):Y(pe.x,pe.y,u/h*re)}for(let re=m-1;re>=0;re--){let ie=re/m,pe=f*Math.cos(ie*Math.PI/2),ve=p*Math.sin(ie*Math.PI/2)+x;for(let we=0,ke=N.length;we<ke;we++){let Ue=F(N[we],J[we],ve);Y(Ue.x,Ue.y,u+pe)}for(let we=0,ke=B.length;we<ke;we++){let Ue=B[we];k=Z[we];for(let Re=0,Q=Ue.length;Re<Q;Re++){let U=F(Ue[Re],k[Re],ve);_?Y(U.x,U.y+M[h-1].y,M[h-1].x+pe):Y(U.x,U.y,u+pe)}}}ce(),q();function ce(){let re=i.length/3;if(d){let ie=0,pe=V*ie;for(let ve=0;ve<ee;ve++){let we=D[ve];ne(we[2]+pe,we[1]+pe,we[0]+pe)}ie=h+m*2,pe=V*ie;for(let ve=0;ve<ee;ve++){let we=D[ve];ne(we[0]+pe,we[1]+pe,we[2]+pe)}}else{for(let ie=0;ie<ee;ie++){let pe=D[ie];ne(pe[2],pe[1],pe[0])}for(let ie=0;ie<ee;ie++){let pe=D[ie];ne(pe[0]+V*h,pe[1]+V*h,pe[2]+V*h)}}n.addGroup(re,i.length/3-re,0)}function q(){let re=i.length/3,ie=0;$(N,ie),ie+=N.length;for(let pe=0,ve=B.length;pe<ve;pe++){let we=B[pe];$(we,ie),ie+=we.length}n.addGroup(re,i.length/3-re,1)}function $(re,ie){let pe=re.length;for(;--pe>=0;){let ve=pe,we=pe-1;we<0&&(we=re.length-1);for(let ke=0,Ue=h+m*2;ke<Ue;ke++){let Re=V*ke,Q=V*(ke+1),U=ie+ve+Re,Te=ie+we+Re,ye=ie+we+Q,R=ie+ve+Q;le(U,Te,ye,R)}}}function Y(re,ie,pe){l.push(re),l.push(ie),l.push(pe)}function ne(re,ie,pe){he(re),he(ie),he(pe);let ve=i.length/3,we=y.generateTopUV(n,i,ve-3,ve-2,ve-1);Ae(we[0]),Ae(we[1]),Ae(we[2])}function le(re,ie,pe,ve){he(re),he(ie),he(ve),he(ie),he(pe),he(ve);let we=i.length/3,ke=y.generateSideWallUV(n,i,we-6,we-3,we-2,we-1);Ae(ke[0]),Ae(ke[1]),Ae(ke[3]),Ae(ke[1]),Ae(ke[2]),Ae(ke[3])}function he(re){i.push(l[re*3+0]),i.push(l[re*3+1]),i.push(l[re*3+2])}function Ae(re){r.push(re.x),r.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Sy(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new qh[i.type]().fromJSON(i)),new s(n,e.options)}},My={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new Me(r,a),new Me(o,l),new Me(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],x=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Me(a,1-l),new Me(c,1-u),new Me(d,1-p),new Me(x,1-g)]:[new Me(o,1-l),new Me(h,1-u),new Me(f,1-p),new Me(m,1-g)]}};function Sy(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var sl=class s extends Wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},rl=class s extends it{constructor(e=[new Me(0,-.5),new Me(.5,0),new Me(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=et(i,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,u=new L,d=new Me,f=new L,p=new L,x=new L,m=0,g=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,p.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(p)}for(let y=0;y<=t;y++){let M=n+y*h*i,_=Math.sin(M),w=Math.cos(M);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*_,u.y=e[E].y,u.z=e[E].x*w,a.push(u.x,u.y,u.z),d.x=y/t,d.y=E/(e.length-1),o.push(d.x,d.y);let P=l[3*E+0]*_,b=l[3*E+1],S=l[3*E+0]*w;c.push(P,b,S)}}for(let y=0;y<t;y++)for(let M=0;M<e.length-1;M++){let _=M+y*e.length,w=_,E=_+e.length,P=_+e.length+1,b=_+1;r.push(w,E,b),r.push(P,b,E)}this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},ga=class s extends Wi{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},ir=class s extends it{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let y=g*d-a;for(let M=0;M<c;M++){let _=M*u-r;p.push(_,-y,0),x.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<o;y++){let M=y+c*g,_=y+c*(g+1),w=y+1+c*(g+1),E=y+1+c*g;f.push(M,_,E),f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},al=class s extends it{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new L,p=new Me;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let g=r+m/n*a;f.x=u*Math.cos(g),f.y=u*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let g=0;g<n;g++){let y=g+m,M=y,_=y+n+1,w=y+n+2,E=y+1;o.push(M,_,E),o.push(_,w,E)}}this.setIndex(o),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},ol=class s extends it{constructor(e=new ys([new Me(0,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ve(i,3)),this.setAttribute("normal",new Ve(r,3)),this.setAttribute("uv",new Ve(a,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;Zn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){let y=p[m];Zn.isClockWise(y)===!0&&(p[m]=y.reverse())}let x=Zn.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){let y=p[m];f=f.concat(y)}for(let m=0,g=f.length;m<g;m++){let y=f[m];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let m=0,g=x.length;m<g;m++){let y=x[m],M=y[0]+u,_=y[1]+u,w=y[2]+u;n.push(M,_,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return wy(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let a=t[e.shapes[i]];n.push(a)}return new s(n,e.curveSegments)}};function wy(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var xa=class s extends it{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new L,d=new L,f=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){let y=[],M=g/n,_=a+M*o,w=e*Math.cos(_),E=Math.sqrt(e*e-w*w),P=0;g===0&&a===0?P=.5/t:g===n&&l===Math.PI&&(P=-.5/t);for(let b=0;b<=t;b++){let S=b/t,I=i+S*r;u.x=-E*Math.cos(I),u.y=w,u.z=E*Math.sin(I),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(S+P,1-M),y.push(c++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<t;y++){let M=h[g][y+1],_=h[g][y],w=h[g+1][y],E=h[g+1][y+1];(g!==0||a>0)&&f.push(M,_,E),(g!==n-1||l<Math.PI)&&f.push(_,w,E)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(x,3)),this.setAttribute("uv",new Ve(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},ll=class s extends Wi{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},cl=class s extends it{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],u=[],d=new L,f=new L,p=new L;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let g=0;g<=i;g++){let y=g/i*r;f.x=(e+t*Math.cos(m))*Math.cos(y),f.y=(e+t*Math.cos(m))*Math.sin(y),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(g/i),u.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=i;m++){let g=(i+1)*x+m-1,y=(i+1)*(x-1)+m-1,M=(i+1)*(x-1)+m,_=(i+1)*x+m;l.push(g,y,_),l.push(y,M,_)}this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},hl=class s extends it{constructor(e=1,t=.4,n=64,i=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new L,d=new L,f=new L,p=new L,x=new L,m=new L,g=new L;for(let M=0;M<=n;++M){let _=M/n*r*Math.PI*2;y(_,r,a,e,f),y(_+.01,r,a,e,p),m.subVectors(p,f),g.addVectors(p,f),x.crossVectors(m,g),g.crossVectors(x,m),x.normalize(),g.normalize();for(let w=0;w<=i;++w){let E=w/i*Math.PI*2,P=-t*Math.cos(E),b=t*Math.sin(E);u.x=f.x+(P*g.x+b*x.x),u.y=f.y+(P*g.y+b*x.y),u.z=f.z+(P*g.z+b*x.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(M/n),h.push(w/i)}}for(let M=1;M<=n;M++)for(let _=1;_<=i;_++){let w=(i+1)*(M-1)+(_-1),E=(i+1)*M+(_-1),P=(i+1)*M+_,b=(i+1)*(M-1)+_;o.push(w,E,b),o.push(E,P,b)}this.setIndex(o),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(h,2));function y(M,_,w,E,P){let b=Math.cos(M),S=Math.sin(M),I=w/_*M,B=Math.cos(I);P.x=E*(2+B)*.5*b,P.y=E*(2+B)*S*.5,P.z=E*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},ul=class s extends it{constructor(e=new fa(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new L,l=new L,c=new Me,h=new L,u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ve(u,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(f,2));function x(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),y(),g()}function m(M){h=e.getPointAt(M/t,h);let _=a.normals[M],w=a.binormals[M];for(let E=0;E<=i;E++){let P=E/i*Math.PI*2,b=Math.sin(P),S=-Math.cos(P);l.x=S*_.x+b*w.x,l.y=S*_.y+b*w.y,l.z=S*_.z+b*w.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=t;M++)for(let _=1;_<=i;_++){let w=(i+1)*(M-1)+(_-1),E=(i+1)*M+(_-1),P=(i+1)*M+_,b=(i+1)*(M-1)+_;p.push(w,E,b),p.push(E,P,b)}}function y(){for(let M=0;M<=t;M++)for(let _=0;_<=i;_++)c.x=M/t,c.y=_/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new qh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},sr=class extends it{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new L,r=new L;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start,f=u.count;for(let p=d,x=d+f;p<x;p+=3)for(let m=0;m<3;m++){let g=o.getX(p+m),y=o.getX(p+(m+1)%3);i.fromBufferAttribute(a,g),r.fromBufferAttribute(a,y),Jm(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,u),Jm(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Jm(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Km=Object.freeze({__proto__:null,BoxGeometry:gs,CapsuleGeometry:Xo,CircleGeometry:qo,ConeGeometry:xs,CylinderGeometry:ca,DodecahedronGeometry:$o,EdgesGeometry:Yo,ExtrudeGeometry:il,IcosahedronGeometry:sl,LatheGeometry:rl,OctahedronGeometry:ga,PlaneGeometry:ir,PolyhedronGeometry:Wi,RingGeometry:al,ShapeGeometry:ol,SphereGeometry:xa,TetrahedronGeometry:ll,TorusGeometry:cl,TorusKnotGeometry:hl,TubeGeometry:ul,WireframeGeometry:sr}),dl=class extends Xt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ze(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function yr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(jm(i))i.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(jm(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function xn(s){let e={};for(let t=0;t<s.length;t++){let n=yr(s[t]);for(let i in n)e[i]=n[i]}return e}function jm(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Ey(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function lp(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}var qa={clone:yr,merge:xn},Ty=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ay=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Xt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ty,this.fragmentShader=Ay,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yr(e.uniforms),this.uniformsGroups=Ey(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new ze().setHex(i.value);break;case"v2":this.uniforms[n].value=new Me().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ut().fromArray(i.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Qe().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},_a=class extends tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ya=class extends Xt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},fl=class extends ya{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return et(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},pl=class extends Xt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ze(16777215),this.specular=new ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ua,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ml=class extends Xt{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ze(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},gl=class extends Xt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},xl=class extends Xt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ua,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},va=class extends Xt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ba=class extends Xt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},_l=class extends Xt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new ze(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},yl=class extends jt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ai(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function So(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function w0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function mf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function E0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}function Cy(s,e,t,n,i=30){let r=s.clone();r.name=e;let a=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){u.push(c.times[f]);for(let x=0;x<h;++x)d.push(c.values[f*h+x])}}u.length!==0&&(c.times=ai(u,c.times.constructor),c.values=ai(d,c.values.constructor),a.push(c))}r.tracks=a;let o=1/0;for(let l=0;l<r.tracks.length;++l)o>r.tracks[l].times[0]&&(o=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r}function Ry(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let a=0;a<i;++a){let o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(g){return g.name===o.name&&g.ValueTypeName===l});if(c===void 0)continue;let h=0,u=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);let p=o.times.length-1,x;if(r<=o.times[0]){let g=h,y=u-h;x=o.values.slice(g,y)}else if(r>=o.times[p]){let g=p*u+h,y=g+u-h;x=o.values.slice(g,y)}else{let g=o.createInterpolant(),y=h,M=u-h;g.evaluate(r),x=g.resultBuffer.slice(y,M)}l==="quaternion"&&new Gt().fromArray(x).normalize().conjugate().toArray(x);let m=c.times.length;for(let g=0;g<m;++g){let y=g*f+d;if(l==="quaternion")Gt.multiplyQuaternionsFlat(c.values,y,x,0,c.values,y);else{let M=f-d*2;for(let _=0;_<M;++_)c.values[y+_]-=x[_]}}}return s.blendMode=Ju,s}var $h=class{static convertArray(e,t){return ai(e,t)}static isTypedArray(e){return d0(e)}static hasTangents(e){return So(e)}static getKeyframeOrder(e){return w0(e)}static sortedArray(e,t,n){return mf(e,t,n)}static flattenJSON(e,t,n,i){E0(e,t,n,i)}static subclip(e,t,n,i,r=30){return Cy(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return Ry(e,t,n,i)}},Xi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},vl=class extends Xi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hs,endingEnd:hs}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case us:r=e,o=2*t-n;break;case Kr:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case us:a=e,l=2*n-t;break;case Kr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),x=p*p,m=x*p,g=-d*m+2*d*x-d*p,y=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*p+1,M=(-1-f)*m+(1.5+f)*x+.5*p,_=f*m-f*x;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+y*a[c+w]+M*a[l+w]+_*a[u+w];return r}},Ma=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},bl=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ml=class extends Xi{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),x=1-p;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*p;return r}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let x=a[c+p],m=a[l+p],g=f*d+p*2,y=u[g],M=u[g+1],_=e*d+p*2,w=h[_],E=h[_+1],P=Iy(n,t,y,w,i);r[p]=T0(P,x,M,E,m)}return r}};function T0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Py(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Iy(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=T0(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let l=Py(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var En=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ai(t,this.TimeBufferType),this.values=ai(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ai(e.times,Array),values:ai(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),So(e.settings)&&(n.settings={inTangents:ai(e.settings.inTangents,Array),outTangents:ai(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ml(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case Io:t=this.InterpolantFactoryMethodLinear;break;case _o:t=this.InterpolantFactoryMethodSmooth;break;case Ch:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return De("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return Io;case this.InterpolantFactoryMethodSmooth:return _o;case this.InterpolantFactoryMethodBezier:return Ch}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;So(this.settings)&&(Qm(this.settings.inTangents,e),Qm(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Je("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Je("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&d0(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Je("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_o,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let x=t[u+p];if(x!==t[d+p]||x!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,So(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Qm(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=Io;var Ei=class extends En{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="bool";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=Jr;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var Sa=class extends En{constructor(e,t,n,i){super(e,t,n,i)}};Sa.prototype.ValueTypeName="color";var rr=class extends En{constructor(e,t,n,i){super(e,t,n,i)}};rr.prototype.ValueTypeName="number";var Sl=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Gt.slerpFlat(r,0,a,c-o,a,c,l);return r}},ar=class extends En{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Sl(this.times,this.values,this.getValueSize(),e)}};ar.prototype.ValueTypeName="quaternion";ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Ti=class extends En{constructor(e,t,n){super(e,t,n)}};Ti.prototype.ValueTypeName="string";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=Jr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends En{constructor(e,t,n,i){super(e,t,n,i)}};wa.prototype.ValueTypeName="vector";var vs=class{constructor(e="",t=-1,n=[],i=bc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Vn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Dy(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(En.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=w0(l);l=mf(l,1,h),c=mf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new rr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ly(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rr;case"vector":case"vector2":case"vector3":case"vector4":return wa;case"color":return Sa;case"quaternion":return ar;case"bool":case"boolean":return Ei;case"string":return Ti}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Dy(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Ly(s.type);if(s.times===void 0){let n=[],i=[];E0(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),So(s.settings)&&(t.settings={inTangents:ai(s.settings.inTangents,Float32Array),outTangents:ai(s.settings.outTangents,Float32Array)}),t}var ci={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(eg(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!eg(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function eg(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ea=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},cp=new Ea,nn=class{constructor(e){this.manager=e!==void 0?e:cp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};nn.DEFAULT_MATERIAL_NAME="__DEFAULT";var zi={},gf=class extends Error{constructor(e,t){super(e),this.response=t}},Kn=class extends nn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ci.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(zi[e]!==void 0){zi[e].push({onLoad:t,onProgress:n,onError:i});return}zi[e]=[],zi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&De("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=zi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,x=0,m=new ReadableStream({start(g){y();function y(){u.read().then(({done:M,value:_})=>{if(M)g.close();else{x+=_.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let E=0,P=h.length;E<P;E++){let b=h[E];b.onProgress&&b.onProgress(w)}g.enqueue(_),y()}},M=>{g.error(M)})}}});return new Response(m)}else throw new gf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{ci.add(`file:${e}`,c);let h=zi[e];delete zi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=zi[e];if(h===void 0)throw this.manager.itemError(e),c;delete zi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Yh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=vs.parse(e[n]);t.push(i)}return t}},Zh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=[],o=new er,l=new Kn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(u){l.load(e[u],function(d){let f=r.parse(d,!0);a[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Ct),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){let d=r.parse(u,!0);if(d.isCubemap){let f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let x=0;x<d.mipmapCount;x++)a[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+x]),a[p].format=d.format,a[p].width=d.width,a[p].height=d.height}o.image=a}else o.image.width=d.width,o.image.height=d.height,o.mipmaps=d.mipmaps;d.mipmapCount===1&&(o.minFilter=Ct),o.format=d.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}},kr=new WeakMap,bs=class extends nn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ci.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=kr.get(a);u===void 0&&(u=[],kr.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=ea("img");function l(){h(),t&&t(this);let u=kr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}kr.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),ci.remove(`image:${e}`);let d=kr.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}kr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ci.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}},Jh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=new ms;r.colorSpace=Qt;let a=new bs(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(h){r.images[c]=h,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},Kh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new wn,o=new Kn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):Je(h);return}r._applyTexData(a,c),t&&t(a,c)},n,i),a}createDataTexture(e){let t=new wn;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Sn,e.wrapT=t.wrapT!==void 0?t.wrapT:Sn,e.magFilter=t.magFilter!==void 0?t.magFilter:Ct,e.minFilter=t.minFilter!==void 0?t.minFilter:Ct,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=xi),t.mipmapCount===1&&(e.minFilter=Ct),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},jh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=new Ot,a=new bs(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},fi=class extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},wl=class extends fi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},nf=new Qe,tg=new L,ng=new L,or=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wi,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;tg.setFromMatrixPosition(e.matrixWorld),t.position.copy(tg),ng.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ng),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){nf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(nf,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===ds||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(nf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},_h=new L,yh=new Gt,Mi=new L,lr=class extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_h,yh,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_h,yh,Mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_h,yh,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_h,yh,Mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ls=new L,ig=new Me,sg=new Me,Nt=class extends lr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qs*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ls.x,ls.y).multiplyScalar(-e/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-e/ls.z)}getViewSize(e,t){return this.getViewBounds(e,ig,sg),t.subVectors(sg,ig)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},xf=class extends or{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=qs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},El=class extends fi{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},_f=class extends or{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0}},Tl=class extends fi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _f}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ms=class extends lr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yf=class extends or{constructor(){super(new Ms(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},cr=class extends fi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new yf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},hr=class extends fi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},Al=class extends fi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},Ta=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new L)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*r),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*r)),t.addScaledVector(a[6],.315392*(3*r*r-1)),t.addScaledVector(a[7],1.092548*(n*r)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*r),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*r),t.addScaledVector(a[6],.743125*r*r-.247708),t.addScaledVector(a[7],2*.429043*n*r),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},Cl=class extends fi{constructor(e=new Ta,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},rg={},Rl=class s extends nn{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,a=new Kn(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:dl,SpriteMaterial:ps,RawShaderMaterial:_a,ShaderMaterial:tn,PointsMaterial:aa,MeshPhysicalMaterial:fl,MeshStandardMaterial:ya,MeshPhongMaterial:pl,MeshToonMaterial:ml,MeshNormalMaterial:gl,MeshLambertMaterial:xl,MeshDepthMaterial:va,MeshDistanceMaterial:ba,MeshBasicMaterial:kn,MeshMatcapMaterial:_l,LineDashedMaterial:yl,LineBasicMaterial:jt,Material:Xt,...rg}[e],i;return n===void 0?(Si(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new Xt):i=new n,i}static registerMaterial(e,t){rg[e]=t}},Aa=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ur=class extends it{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Pl=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let m=f.interleavedBuffers[p],g=r(f,m.buffer),y=qr(m.type,g),M=new js(y,m.stride);return M.uuid=m.uuid,m.usage!==void 0&&M.setUsage(m.usage),t[p]=M,M}function r(f,p){if(n[p]!==void 0)return n[p];let m=f.arrayBuffers[p],g=new Uint32Array(m).buffer;return n[p]=g,g}let a=e.isInstancedBufferGeometry?new ur:new it,o=e.data.index;if(o!==void 0){let f=qr(o.type,o.array);a.setIndex(new vt(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],x;if(p.isInterleavedBufferAttribute){let m=i(e.data,p.data);x=new mn(m,p.itemSize,p.offset,p.normalized)}else{let m=qr(p.type,p.array),g=p.isInstancedBufferAttribute?Gi:vt;x=new g(m,p.itemSize,p.normalized)}p.name!==void 0&&(x.name=p.name),p.usage!==void 0&&x.setUsage(p.usage),p.gpuType!==void 0&&(x.gpuType=p.gpuType),a.setAttribute(f,x)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],x=[];for(let m=0,g=p.length;m<g;m++){let y=p[m],M;if(y.isInterleavedBufferAttribute){let _=i(e.data,y.data);M=new mn(_,y.itemSize,y.offset,y.normalized)}else{let _=qr(y.type,y.array);M=new vt(_,y.itemSize,y.normalized)}y.name!==void 0&&(M.name=y.name),y.usage!==void 0&&M.setUsage(y.usage),y.gpuType!==void 0&&(M.gpuType=y.gpuType),x.push(M)}a.morphAttributes[f]=x}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);let u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){let x=u[f];a.addGroup(x.start,x.count,x.materialIndex)}let d=e.data.boundingSphere;return d!==void 0&&(a.boundingSphere=new It().fromJSON(d)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}},sf={},Qh=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=this.path===""?Aa.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;let o=new Kn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),Je("ObjectLoader: Can't parse "+e+".",u.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),Je("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?Aa.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new Kn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let a=await r.loadAsync(e,t),o;try{o=JSON.parse(a)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,r,l,o,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let u=!1;for(let d in a)if(a[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,r),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){sf[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new ys().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=new Oo().fromJSON(e[r],i);n[o.uuid]=o}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new Pl;for(let r=0,a=e.length;r<a;r++){let o,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in Km?o=Km[l.type].fromJSON(l,t):l.type in sf?o=sf[l.type].fromJSON(l,t):De(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new Rl;r.setTextures(t);for(let a=0,o=e.length;a<o;a++){let l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=vs.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function a(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(h)}else return l.data?{data:qr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new Ea(t);r=new bs(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let u=e[c],d=u.url;if(Array.isArray(d)){let f=[];for(let p=0,x=d.length;p<x;p++){let m=d[p],g=o(m);g!==null&&(g instanceof HTMLImageElement?f.push(g):f.push(new wn(g.data,g.width,g.height)))}i[u.uuid]=new Yn(f)}else{let f=o(u.url);i[u.uuid]=new Yn(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(a){if(typeof a=="string"){let o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:qr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new bs(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){let l=e[a],c=l.url;if(Array.isArray(c)){let h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new wn(p.data,p.width,p.height)))}n[l.uuid]=new Yn(h)}else{let h=await r(l.url);n[l.uuid]=new Yn(h)}}}return n}parseTextures(e,t){function n(r,a){return typeof r=="number"?r:(De("ObjectLoader.parseTexture: Constant should be in numeric form.",r),a[r])}let i={};if(e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=e[r];o.image===void 0&&De('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&De("ObjectLoader: Undefined image",o.image);let l=t[o.image],c=l.data,h;Array.isArray(c)?(h=new ms,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new wn:h=new Ot,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,Uy)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],ag),h.wrapT=n(o.wrap[1],ag)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,og)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,og)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.normalized!==void 0&&(h.normalized=o.normalized),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(e,t,n,i,r){let a;function o(d){return t[d]===void 0&&De("ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){let f=[];for(let p=0,x=d.length;p<x;p++){let m=d[p];n[m]===void 0&&De("ObjectLoader: Undefined material",m),f.push(n[m])}return f}return n[d]===void 0&&De("ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&De("ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":a=new Ks,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new ze(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new Uo(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Do(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new Nt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new Ms(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new hr(e.color,e.intensity);break;case"DirectionalLight":a=new cr(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new Tl(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new Al(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new El(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new wl(e.color,e.groundColor,e.intensity);break;case"LightProbe":let d=new Ta().fromArray(e.sh);a=new Cl(d,e.intensity);break;case"SkinnedMesh":h=o(e.geometry),u=l(e.material),a=new Fo(h,u),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":h=o(e.geometry),u=l(e.material),a=new Et(h,u);break;case"InstancedMesh":h=o(e.geometry),u=l(e.material);let f=e.count,p=e.instanceMatrix,x=e.instanceColor;a=new Bo(h,u,f),a.instanceMatrix=new Gi(new Float32Array(p.array),16),x!==void 0&&(a.instanceColor=new Gi(new Float32Array(x.array),x.itemSize));break;case"BatchedMesh":h=o(e.geometry),u=l(e.material),a=new Vo(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),a.geometry=h,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(m=>{let g=null,y=null;return m.boundingBox!==void 0&&(g=new Pt().fromJSON(m.boundingBox)),m.boundingSphere!==void 0&&(y=new It().fromJSON(m.boundingSphere)),{...m,boundingBox:g,boundingSphere:y}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new It().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Pt().fromJSON(e.boundingBox));break;case"LOD":a=new No;break;case"Line":a=new di(o(e.geometry),l(e.material));break;case"LineLoop":a=new ko(o(e.geometry),l(e.material));break;case"LineSegments":a=new Gn(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new Go(o(e.geometry),l(e.material));break;case"Sprite":a=new Qs(l(e.material));break;case"Group":a=new li;break;case"Bone":a=new ra;break;default:a=new pt}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new L().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(a.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(a.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(a.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){let d=e.children;for(let f=0;f<d.length;f++)a.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){let d=e.animations;for(let f=0;f<d.length;f++){let p=d[f];a.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);let d=e.levels;for(let f=0;f<d.length;f++){let p=d[f],x=a.getObjectByProperty("uuid",p.object);x!==void 0&&a.addLevel(x,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?De("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new pt}})}},Uy={UVMapping:Bl,CubeReflectionMapping:gi,CubeRefractionMapping:Ji,EquirectangularReflectionMapping:Na,EquirectangularRefractionMapping:Fa,CubeUVReflectionMapping:mr},ag={RepeatWrapping:Yr,ClampToEdgeWrapping:Sn,MirroredRepeatWrapping:Zr},og={NearestFilter:Ft,NearestMipmapNearestFilter:Hu,NearestMipmapLinearFilter:gr,LinearFilter:Ct,LinearMipmapNearestFilter:Oa,LinearMipmapLinearFilter:xi},rf=new WeakMap,eu=class extends nn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&De("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&De("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ci.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{rf.has(a)===!0?(i&&i(rf.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ci.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),rf.set(l,c),ci.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ci.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},vh,Ca=class{static getContext(){return vh===void 0&&(vh=new(window.AudioContext||window.webkitAudioContext)),vh}static setContext(e){vh=e}},tu=class extends nn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{let c=l.slice(0),h=Ca.getContext(),u=e+"#decode";r.manager.itemStart(u),h.decodeAudioData(c,function(d){t(d),r.manager.itemEnd(u)}).catch(function(d){o(d),r.manager.itemEnd(u)})}catch(c){o(c)}},n,i);function o(l){i?i(l):Je(l),r.manager.itemError(e)}}},lg=new Qe,cg=new Qe,Bs=new Qe,nu=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Nt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Nt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Bs.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,a=t.near*Math.tan(Ws*t.fov*.5)/t.zoom,o,l;cg.elements[12]=-i,lg.elements[12]=i,o=-a*t.aspect+r,l=a*t.aspect+r,Bs.elements[0]=2*t.near/(l-o),Bs.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(Bs),o=-a*t.aspect-r,l=a*t.aspect-r,Bs.elements[0]=2*t.near/(l-o),Bs.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(Bs)}this.cameraL.matrix.copy(e.matrixWorld).multiply(cg),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(lg),this.cameraR.matrixWorldNeedsUpdate=!0}},Gr=-90,Hr=1,Il=class extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Nt(Gr,Hr,e,t);i.layers=this.layers,this.add(i);let r=new Nt(Gr,Hr,e,t);r.layers=this.layers,this.add(r);let a=new Nt(Gr,Hr,e,t);a.layers=this.layers,this.add(a);let o=new Nt(Gr,Hr,e,t);o.layers=this.layers,this.add(o);let l=new Nt(Gr,Hr,e,t);l.layers=this.layers,this.add(l);let c=new Nt(Gr,Hr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ll=class extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Dl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ny.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Ny(){this._document.hidden===!1&&this.reset()}var zs=new L,af=new Gt,Fy=new L,Vs=new L,ks=new L,iu=class extends pt{constructor(){super(),this.type="AudioListener",this.context=Ca.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Dl}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(zs,af,Fy),Vs.set(0,0,-1).applyQuaternion(af),ks.set(0,1,0).applyQuaternion(af),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(zs.x,n),t.positionY.linearRampToValueAtTime(zs.y,n),t.positionZ.linearRampToValueAtTime(zs.z,n),t.forwardX.linearRampToValueAtTime(Vs.x,n),t.forwardY.linearRampToValueAtTime(Vs.y,n),t.forwardZ.linearRampToValueAtTime(Vs.z,n),t.upX.linearRampToValueAtTime(ks.x,n),t.upY.linearRampToValueAtTime(ks.y,n),t.upZ.linearRampToValueAtTime(ks.z,n)}else t.setPosition(zs.x,zs.y,zs.z),t.setOrientation(Vs.x,Vs.y,Vs.z,ks.x,ks.y,ks.z)}},Ul=class extends pt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){De("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){De("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){De("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){De("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){De("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(De("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){De("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(De("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},Gs=new L,hg=new Gt,Oy=new L,Hs=new L,su=class extends Ul{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Gs,hg,Oy),Hs.set(0,0,1).applyQuaternion(hg);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Gs.x,n),t.positionY.linearRampToValueAtTime(Gs.y,n),t.positionZ.linearRampToValueAtTime(Gs.z,n),t.orientationX.linearRampToValueAtTime(Hs.x,n),t.orientationY.linearRampToValueAtTime(Hs.y,n),t.orientationZ.linearRampToValueAtTime(Hs.z,n)}else t.setPosition(Gs.x,Gs.y,Gs.z),t.setOrientation(Hs.x,Hs.y,Hs.z)}},ru=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},Nl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Gt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;Gt.multiplyQuaternionsFlat(e,a,e,t,e,n),Gt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},hp="\\[\\]\\.:\\/",By=new RegExp("["+hp+"]","g"),up="[^"+hp+"]",zy="[^"+hp.replace("\\.","")+"]",Vy=/((?:WC+[\/:])*)/.source.replace("WC",up),ky=/(WCOD+)?/.source.replace("WCOD",zy),Gy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",up),Hy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",up),Wy=new RegExp("^"+Vy+ky+Gy+Hy+"$"),Xy=["material","materials","bones","map"],vf=class{constructor(e,t,n){let i=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(By,"")}static parseTrackName(e){let t=Wy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Xy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=vf;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var au=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Vn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,a=r.length,o,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){let d=arguments[h],f=d.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(d);for(let x=0,m=a;x!==m;++x)r[x].push(new yt(d,n[x],i[x]))}else if(p<c){o=e[p];let x=--c,m=e[x];t[m.uuid]=p,e[p]=m,t[f]=x,e[x]=d;for(let g=0,y=a;g!==y;++g){let M=r[g],_=M[x],w=M[p];M[p]=_,w===void 0&&(w=new yt(d,n[g],i[g])),M[x]=w}}else e[p]!==o&&Je("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){let l=arguments[a],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let u=r++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,p=i;f!==p;++f){let x=n[f],m=x[u],g=x[h];x[h]=m,x[u]=g}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){let c=arguments[o],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<r){let d=--r,f=e[d],p=--a,x=e[p];u!==d&&(t[f.uuid]=u),e[u]=f,d!==p&&(t[x.uuid]=d),e[d]=x,e.pop();for(let m=0,g=i;m!==g;++m){let y=n[m],M=y[d],_=y[p];y[u]=M,y[d]=_,y.pop()}}else{let d=--a,f=e[d];u!==d&&(t[f.uuid]=u),e[u]=f,e.pop();for(let p=0,x=i;p!==x;++p){let m=n[p];m[u]=m[d],m.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=r.length,n[e]=i,a.push(e),o.push(t),r.push(u);for(let d=h,f=l.length;d!==f;++d){let p=l[d];u[d]=new yt(p,e,t)}return u}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=i[o];t[c]=n,a[n]=l,a.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}},Fl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:hs,endingEnd:hs};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Yf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ju:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case bc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===Zf;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===$f){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=us,i.endingEnd=us):(e?i.endingStart=this.zeroSlopeAtStart?us:hs:i.endingStart=Kr,t?i.endingEnd=this.zeroSlopeAtEnd?us:hs:i.endingEnd=Kr)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},qy=new Float32Array(1),ou=class extends Un{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,p=h[f];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;p=new Nl(yt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Ma(new Float32Array(2),new Float32Array(2),1,qy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?vs.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=bc),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new Fl(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?vs.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},lu=class extends na{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let a=new Ys(null,e,t,n);a.isRenderTargetTexture=!0,a.renderTarget=this,this.textures[r]=a}this._setTextureOptions(i)}},cu=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},$y=0,hu=class extends Un{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:$y++}),this.name="",this.usage=wc,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<r.length;a++)this.uniforms.push(r[a].clone())}return this}clone(){return new this.constructor().copy(this)}},qi=class extends js{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},uu=class{constructor(e,t,n,i,r,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},ug=new Qe,du=class{constructor(e,t,n=0,i=1/0){this.ray=new ui(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ug.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ug),this}intersectObject(e,t=!0,n=[]){return bf(e,this,n,t),n.sort(dg),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)bf(e[i],this,n,t);return n.sort(dg),n}};function dg(s,e){return s.distance-e.distance}function bf(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)bf(r[a],e,t,!0)}}var fu=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,De("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},dr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},pu=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},gp=class gp{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};gp.prototype.isMatrix2=!0;var mu=gp,fg=new Me,Ol=class{constructor(e=new Me(1/0,1/0),t=new Me(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fg.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fg).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},pg=new L,bh=new L,Wr=new L,Xr=new L,of=new L,Yy=new L,Zy=new L,Ra=class{constructor(e=new L,t=new L){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){pg.subVectors(e,this.start),bh.subVectors(this.end,this.start);let n=bh.dot(bh);if(n===0)return 0;let r=bh.dot(pg)/n;return t&&(r=et(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=Yy,n=Zy){let i=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,h=e.end;Wr.subVectors(c,o),Xr.subVectors(h,l),of.subVectors(o,l);let u=Wr.dot(Wr),d=Xr.dot(Xr),f=Xr.dot(of);if(u<=i&&d<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(u<=i)r=0,a=f/d,a=et(a,0,1);else{let p=Wr.dot(of);if(d<=i)a=0,r=et(-p/u,0,1);else{let x=Wr.dot(Xr),m=u*d-x*x;m!==0?r=et((x*f-p*d)/m,0,1):r=0,a=(x*r+f)/d,a<0?(a=0,r=et(-p/u,0,1)):a>1&&(a=1,r=et((x-p)/u,0,1))}}return t.copy(o).addScaledVector(Wr,r),n.copy(l).addScaledVector(Xr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},mg=new L,gu=class extends pt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new it,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){let c=a/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Ve(i,3));let r=new jt({fog:!1,toneMapped:!1});this.cone=new Gn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),mg.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(mg),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},cs=new L,Mh=new Qe,lf=new Qe,xu=class extends Gn{constructor(e){let t=A0(e),n=new it,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new Ve(i,3)),n.setAttribute("color",new Ve(r,3));let a=new jt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let o=new ze(255),l=new ze(65280);this.setColors(o,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");lf.copy(this.root.matrixWorld).invert();for(let r=0,a=0;r<t.length;r++){let o=t[r];o.parent&&o.parent.isBone&&(Mh.multiplyMatrices(lf,o.matrixWorld),cs.setFromMatrixPosition(Mh),i.setXYZ(a,cs.x,cs.y,cs.z),Mh.multiplyMatrices(lf,o.parent.matrixWorld),cs.setFromMatrixPosition(Mh),i.setXYZ(a+1,cs.x,cs.y,cs.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function A0(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...A0(s.children[t]));return e}var _u=class extends Et{constructor(e,t,n){let i=new xa(t,4,2),r=new kn({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},Jy=new L,gg=new ze,xg=new ze,yu=class extends pt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new ga(t);i.rotateY(Math.PI*.5),this.material=new kn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),a=new Float32Array(r.count*3);i.setAttribute("color",new vt(a,3)),this.add(new Et(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");gg.copy(this.light.color),xg.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?gg:xg;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(Jy.setFromMatrixPosition(this.light.matrixWorld).negate())}},Pa=class extends Gn{constructor(e=10,t=10,n=4473924,i=8947848){n=new ze(n),i=new ze(i);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,p=-o;d<=t;d++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);let x=d===r?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}let h=new it;h.setAttribute("position",new Ve(l,3)),h.setAttribute("color",new Ve(c,3));let u=new jt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},vu=class extends Gn{constructor(e=10,t=16,n=8,i=64,r=4473924,a=8947848){r=new ze(r),a=new ze(a);let o=[],l=[];if(t>1)for(let u=0;u<t;u++){let d=u/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;o.push(0,0,0),o.push(f,0,p);let x=u&1?r:a;l.push(x.r,x.g,x.b),l.push(x.r,x.g,x.b)}for(let u=0;u<n;u++){let d=u&1?r:a,f=e-e/n*u;for(let p=0;p<i;p++){let x=p/i*(Math.PI*2),m=Math.sin(x)*f,g=Math.cos(x)*f;o.push(m,0,g),l.push(d.r,d.g,d.b),x=(p+1)/i*(Math.PI*2),m=Math.sin(x)*f,g=Math.cos(x)*f,o.push(m,0,g),l.push(d.r,d.g,d.b)}}let c=new it;c.setAttribute("position",new Ve(o,3)),c.setAttribute("color",new Ve(l,3));let h=new jt({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},_g=new L,Sh=new L,yg=new L,bu=class extends pt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new it;i.setAttribute("position",new Ve([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new jt({fog:!1,toneMapped:!1});this.lightPlane=new di(i,r),this.add(this.lightPlane),i=new it,i.setAttribute("position",new Ve([0,0,0,0,0,1],3)),this.targetLine=new di(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),_g.setFromMatrixPosition(this.light.matrixWorld),Sh.setFromMatrixPosition(this.light.target.matrixWorld),yg.subVectors(Sh,_g),this.lightPlane.lookAt(Sh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Sh),this.targetLine.scale.z=yg.length()}},wh=new L,Ut=new lr,Mu=class extends Gn{constructor(e){let t=new it,n=new jt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,x){l(p),l(x)}function l(p){i.push(0,0,0),r.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new Ve(i,3)),t.setAttribute("color",new Ve(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new ze(16755200),h=new ze(16711680),u=new ze(43775),d=new ze(16777215),f=new ze(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,r){let o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,a;if(Ut.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,a=0;else if(this.camera.coordinateSystem===Dn)r=-1,a=1;else if(this.camera.coordinateSystem===ds)r=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);kt("c",t,e,Ut,0,0,r),kt("t",t,e,Ut,0,0,a),kt("n1",t,e,Ut,-n,-i,r),kt("n2",t,e,Ut,n,-i,r),kt("n3",t,e,Ut,-n,i,r),kt("n4",t,e,Ut,n,i,r),kt("f1",t,e,Ut,-n,-i,a),kt("f2",t,e,Ut,n,-i,a),kt("f3",t,e,Ut,-n,i,a),kt("f4",t,e,Ut,n,i,a),kt("u1",t,e,Ut,n*.7,i*1.1,r),kt("u2",t,e,Ut,-n*.7,i*1.1,r),kt("u3",t,e,Ut,0,i*2,r),kt("cf1",t,e,Ut,-n,0,a),kt("cf2",t,e,Ut,n,0,a),kt("cf3",t,e,Ut,0,-i,a),kt("cf4",t,e,Ut,0,i,a),kt("cn1",t,e,Ut,-n,0,r),kt("cn2",t,e,Ut,n,0,r),kt("cn3",t,e,Ut,0,-i,r),kt("cn4",t,e,Ut,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function kt(s,e,t,n,i,r,a){wh.set(i,r,a).unproject(n);let o=e[s];if(o!==void 0){let l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],wh.x,wh.y,wh.z)}}var Eh=new Pt,Su=class extends Gn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new it;r.setIndex(new vt(n,1)),r.setAttribute("position",new vt(i,3)),super(r,new jt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Eh.setFromObject(this.object),Eh.isEmpty())return;let e=Eh.min,t=Eh.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},wu=class extends Gn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new it;r.setIndex(new vt(n,1)),r.setAttribute("position",new Ve(i,3)),super(r,new jt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Eu=class extends di{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new it;a.setAttribute("position",new Ve(r,3)),a.computeBoundingSphere(),super(a,new jt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new it;l.setAttribute("position",new Ve(o,3)),l.computeBoundingSphere(),this.add(new Et(l,new kn({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},vg=new L,Th,cf,Ia=class extends pt{constructor(e=new L(0,0,1),t=new L(0,0,0),n=1,i=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",Th===void 0&&(Th=new it,Th.setAttribute("position",new Ve([0,0,0,0,1,0],3)),cf=new xs(.5,1,5,1),cf.translate(0,-.5,0)),this.position.copy(t),this.line=new di(Th,new jt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Et(cf,new kn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{vg.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(vg,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Tu=class extends Gn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new it;i.setAttribute("position",new Ve(t,3)),i.setAttribute("color",new Ve(n,3));let r=new jt({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new ze,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Au=class{constructor(){this.type="ShapePath",this.color=new ze,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new _s,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,a){return this.currentPath.bezierCurveTo(e,t,n,i,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,u=c.length;for(let d=0,f=u-1;d<u;f=d++){let p=c[d],x=c[f];p.y>l.y!=x.y>l.y&&l.x<(x.x-p.x)*(l.y-p.y)/(x.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new Me);if(e(h,l))return h;let u=h.y,d=[],f=l.length;for(let p=0;p<f;p++){let x=l[p],m=l[(p+1)%f];if(x.y>u!=m.y>u){let g=x.x+(u-x.y)*(m.x-x.x)/(m.y-x.y);d.push(g)}}return d.length>1&&(d.sort((p,x)=>p-x),h.x=(d[0]+d[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(De('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Zn.area(c);if(h===0)continue;let u=new Ol;for(let d=0;d<c.length;d++)u.expandByPoint(c[d]);r.push({subPath:l,points:c,boundingBox:u,interiorPoint:t(c,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let u=l-1;u>=0;u--){let d=r[u];if(d.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,d.points)){c.container=d.exclude?d.container:d,h=d.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new ys;c.curves=l.subPath.curves,a.push(c),o.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=o.get(l.container);if(!c)continue;let h=new _s;h.curves=l.subPath.curves,c.holes.push(h)}return a}},La=class extends Un{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ky(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function jy(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function Qy(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function ju(s,e,t,n){let i=ev(n);switch(t){case Yu:return s*e;case Gl:return s*e/i.components*i.byteLength;case Ba:return s*e/i.components*i.byteLength;case ji:return s*e*2/i.components*i.byteLength;case Hl:return s*e*2/i.components*i.byteLength;case Zu:return s*e*3/i.components*i.byteLength;case pn:return s*e*4/i.components*i.byteLength;case Wl:return s*e*4/i.components*i.byteLength;case za:case Va:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ka:case Ga:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ql:case Yl:return Math.max(s,16)*Math.max(e,8)/4;case Xl:case $l:return Math.max(s,8)*Math.max(e,8)/2;case Zl:case Jl:case jl:case Ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Kl:case Ha:case ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case tc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case nc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ic:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case sc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case rc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ac:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case oc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case lc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case cc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case hc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case uc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case dc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case fc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case pc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case mc:case gc:case xc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case _c:case yc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Wa:case vc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ev(s){switch(s){case Tn:case Wu:return{byteLength:1,components:1};case xr:case Xu:case Qn:return{byteLength:2,components:1};case Vl:case kl:return{byteLength:2,components:4};case Hn:case zl:case fn:return{byteLength:4,components:1};case qu:case $u:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var Cu=class{static contain(e,t){return Ky(e,t)}static cover(e,t){return jy(e,t)}static fill(e){return Qy(e)}static getByteLength(e,t,n,i){return ju(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Z0(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function tv(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var nv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,av=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ov=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,uv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Mv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ev=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Av=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Cv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Nv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$v=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Yv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Zv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ib=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,rb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ab=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ob=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ub=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,db=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_b=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Eb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ab=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ib=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Lb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Db=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ub=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ob=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$b=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_M=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,SM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,AM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,IM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,UM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,NM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:nv,alphahash_pars_fragment:iv,alphamap_fragment:sv,alphamap_pars_fragment:rv,alphatest_fragment:av,alphatest_pars_fragment:ov,aomap_fragment:lv,aomap_pars_fragment:cv,batching_pars_vertex:hv,batching_vertex:uv,begin_vertex:dv,beginnormal_vertex:fv,bsdfs:pv,iridescence_fragment:mv,bumpmap_pars_fragment:gv,clipping_planes_fragment:xv,clipping_planes_pars_fragment:_v,clipping_planes_pars_vertex:yv,clipping_planes_vertex:vv,color_fragment:bv,color_pars_fragment:Mv,color_pars_vertex:Sv,color_vertex:wv,common:Ev,cube_uv_reflection_fragment:Tv,defaultnormal_vertex:Av,displacementmap_pars_vertex:Cv,displacementmap_vertex:Rv,emissivemap_fragment:Pv,emissivemap_pars_fragment:Iv,colorspace_fragment:Lv,colorspace_pars_fragment:Dv,envmap_fragment:Uv,envmap_common_pars_fragment:Nv,envmap_pars_fragment:Fv,envmap_pars_vertex:Ov,envmap_physical_pars_fragment:Yv,envmap_vertex:Bv,fog_vertex:zv,fog_pars_vertex:Vv,fog_fragment:kv,fog_pars_fragment:Gv,gradientmap_pars_fragment:Hv,lightmap_pars_fragment:Wv,lights_lambert_fragment:Xv,lights_lambert_pars_fragment:qv,lights_pars_begin:$v,lights_toon_fragment:Zv,lights_toon_pars_fragment:Jv,lights_phong_fragment:Kv,lights_phong_pars_fragment:jv,lights_physical_fragment:Qv,lights_physical_pars_fragment:eb,lights_fragment_begin:tb,lights_fragment_maps:nb,lights_fragment_end:ib,lightprobes_pars_fragment:sb,logdepthbuf_fragment:rb,logdepthbuf_pars_fragment:ab,logdepthbuf_pars_vertex:ob,logdepthbuf_vertex:lb,map_fragment:cb,map_pars_fragment:hb,map_particle_fragment:ub,map_particle_pars_fragment:db,metalnessmap_fragment:fb,metalnessmap_pars_fragment:pb,morphinstance_vertex:mb,morphcolor_vertex:gb,morphnormal_vertex:xb,morphtarget_pars_vertex:_b,morphtarget_vertex:yb,normal_fragment_begin:vb,normal_fragment_maps:bb,normal_pars_fragment:Mb,normal_pars_vertex:Sb,normal_vertex:wb,normalmap_pars_fragment:Eb,clearcoat_normal_fragment_begin:Tb,clearcoat_normal_fragment_maps:Ab,clearcoat_pars_fragment:Cb,iridescence_pars_fragment:Rb,opaque_fragment:Pb,packing:Ib,premultiplied_alpha_fragment:Lb,project_vertex:Db,dithering_fragment:Ub,dithering_pars_fragment:Nb,roughnessmap_fragment:Fb,roughnessmap_pars_fragment:Ob,shadowmap_pars_fragment:Bb,shadowmap_pars_vertex:zb,shadowmap_vertex:Vb,shadowmask_pars_fragment:kb,skinbase_vertex:Gb,skinning_pars_vertex:Hb,skinning_vertex:Wb,skinnormal_vertex:Xb,specularmap_fragment:qb,specularmap_pars_fragment:$b,tonemapping_fragment:Yb,tonemapping_pars_fragment:Zb,transmission_fragment:Jb,transmission_pars_fragment:Kb,uv_pars_fragment:jb,uv_pars_vertex:Qb,uv_vertex:eM,worldpos_vertex:tM,background_vert:nM,background_frag:iM,backgroundCube_vert:sM,backgroundCube_frag:rM,cube_vert:aM,cube_frag:oM,depth_vert:lM,depth_frag:cM,distance_vert:hM,distance_frag:uM,equirect_vert:dM,equirect_frag:fM,linedashed_vert:pM,linedashed_frag:mM,meshbasic_vert:gM,meshbasic_frag:xM,meshlambert_vert:_M,meshlambert_frag:yM,meshmatcap_vert:vM,meshmatcap_frag:bM,meshnormal_vert:MM,meshnormal_frag:SM,meshphong_vert:wM,meshphong_frag:EM,meshphysical_vert:TM,meshphysical_frag:AM,meshtoon_vert:CM,meshtoon_frag:RM,points_vert:PM,points_frag:IM,shadow_vert:LM,shadow_frag:DM,sprite_vert:UM,sprite_frag:NM},Ie={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},_n={basic:{uniforms:xn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:xn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:xn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:xn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:xn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ze(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:xn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:xn([Ie.points,Ie.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:xn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:xn([Ie.common,Ie.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:xn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:xn([Ie.sprite,Ie.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:xn([Ie.common,Ie.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:xn([Ie.lights,Ie.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};_n.physical={uniforms:xn([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Qu={r:0,b:0,g:0},FM=new Qe,J0=new tt;J0.set(-1,0,0,0,1,0,0,0,1);function OM(s,e,t,n,i,r){let a=new ze(0),o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let M=y.isScene===!0?y.background:null;if(M&&M.isTexture){let _=y.backgroundBlurriness>0;M=e.get(M,_)}return M}function p(y){let M=!1,_=f(y);_===null?m(a,o):_&&_.isColor&&(m(_,1),M=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(y,M){let _=f(M);_&&(_.isCubeTexture||_.mapping===mr)?(c===void 0&&(c=new Et(new gs(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:yr(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(FM.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(J0),c.material.toneMapped=lt.getTransfer(_.colorSpace)!==mt,(h!==_||u!==_.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Et(new ir(2,2),new tn({name:"BackgroundMaterial",uniforms:yr(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=lt.getTransfer(_.colorSpace)!==mt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,M){y.getRGB(Qu,lp(s)),t.buffers.color.setClear(Qu.r,Qu.g,Qu.b,M,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:p,addToRenderList:x,dispose:g}}function BM(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(B,G,z,C,N){let F=!1,V=u(B,C,z,G);r!==V&&(r=V,c(r.object)),F=f(B,C,z,N),F&&p(B,C,z,N),N!==null&&e.update(N,s.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,_(B,G,z,C),N!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return s.createVertexArray()}function c(B){return s.bindVertexArray(B)}function h(B){return s.deleteVertexArray(B)}function u(B,G,z,C){let N=C.wireframe===!0,F=n[G.id];F===void 0&&(F={},n[G.id]=F);let V=B.isInstancedMesh===!0?B.id:0,se=F[V];se===void 0&&(se={},F[V]=se);let J=se[z.id];J===void 0&&(J={},se[z.id]=J);let Z=J[N];return Z===void 0&&(Z=d(l()),J[N]=Z),Z}function d(B){let G=[],z=[],C=[];for(let N=0;N<t;N++)G[N]=0,z[N]=0,C[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:z,attributeDivisors:C,object:B,attributes:{},index:null}}function f(B,G,z,C){let N=r.attributes,F=G.attributes,V=0,se=z.getAttributes();for(let J in se)if(se[J].location>=0){let k=N[J],H=F[J];if(H===void 0&&(J==="instanceMatrix"&&B.instanceMatrix&&(H=B.instanceMatrix),J==="instanceColor"&&B.instanceColor&&(H=B.instanceColor)),k===void 0||k.attribute!==H||H&&k.data!==H.data)return!0;V++}return r.attributesNum!==V||r.index!==C}function p(B,G,z,C){let N={},F=G.attributes,V=0,se=z.getAttributes();for(let J in se)if(se[J].location>=0){let k=F[J];k===void 0&&(J==="instanceMatrix"&&B.instanceMatrix&&(k=B.instanceMatrix),J==="instanceColor"&&B.instanceColor&&(k=B.instanceColor));let H={};H.attribute=k,k&&k.data&&(H.data=k.data),N[J]=H,V++}r.attributes=N,r.attributesNum=V,r.index=C}function x(){let B=r.newAttributes;for(let G=0,z=B.length;G<z;G++)B[G]=0}function m(B){g(B,0)}function g(B,G){let z=r.newAttributes,C=r.enabledAttributes,N=r.attributeDivisors;z[B]=1,C[B]===0&&(s.enableVertexAttribArray(B),C[B]=1),N[B]!==G&&(s.vertexAttribDivisor(B,G),N[B]=G)}function y(){let B=r.newAttributes,G=r.enabledAttributes;for(let z=0,C=G.length;z<C;z++)G[z]!==B[z]&&(s.disableVertexAttribArray(z),G[z]=0)}function M(B,G,z,C,N,F,V){V===!0?s.vertexAttribIPointer(B,G,z,N,F):s.vertexAttribPointer(B,G,z,C,N,F)}function _(B,G,z,C){x();let N=C.attributes,F=z.getAttributes(),V=G.defaultAttributeValues;for(let se in F){let J=F[se];if(J.location>=0){let Z=N[se];if(Z===void 0&&(se==="instanceMatrix"&&B.instanceMatrix&&(Z=B.instanceMatrix),se==="instanceColor"&&B.instanceColor&&(Z=B.instanceColor)),Z!==void 0){let k=Z.normalized,H=Z.itemSize,D=e.get(Z);if(D===void 0)continue;let ee=D.buffer,O=D.type,ce=D.bytesPerElement,q=O===s.INT||O===s.UNSIGNED_INT||Z.gpuType===zl;if(Z.isInterleavedBufferAttribute){let $=Z.data,Y=$.stride,ne=Z.offset;if($.isInstancedInterleavedBuffer){for(let le=0;le<J.locationSize;le++)g(J.location+le,$.meshPerAttribute);B.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let le=0;le<J.locationSize;le++)m(J.location+le);s.bindBuffer(s.ARRAY_BUFFER,ee);for(let le=0;le<J.locationSize;le++)M(J.location+le,H/J.locationSize,O,k,Y*ce,(ne+H/J.locationSize*le)*ce,q)}else{if(Z.isInstancedBufferAttribute){for(let $=0;$<J.locationSize;$++)g(J.location+$,Z.meshPerAttribute);B.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let $=0;$<J.locationSize;$++)m(J.location+$);s.bindBuffer(s.ARRAY_BUFFER,ee);for(let $=0;$<J.locationSize;$++)M(J.location+$,H/J.locationSize,O,k,H*ce,H/J.locationSize*$*ce,q)}}else if(V!==void 0){let k=V[se];if(k!==void 0)switch(k.length){case 2:s.vertexAttrib2fv(J.location,k);break;case 3:s.vertexAttrib3fv(J.location,k);break;case 4:s.vertexAttrib4fv(J.location,k);break;default:s.vertexAttrib1fv(J.location,k)}}}}y()}function w(){S();for(let B in n){let G=n[B];for(let z in G){let C=G[z];for(let N in C){let F=C[N];for(let V in F)h(F[V].object),delete F[V];delete C[N]}}delete n[B]}}function E(B){if(n[B.id]===void 0)return;let G=n[B.id];for(let z in G){let C=G[z];for(let N in C){let F=C[N];for(let V in F)h(F[V].object),delete F[V];delete C[N]}}delete n[B.id]}function P(B){for(let G in n){let z=n[G];for(let C in z){let N=z[C];if(N[B.id]===void 0)continue;let F=N[B.id];for(let V in F)h(F[V].object),delete F[V];delete N[B.id]}}}function b(B){for(let G in n){let z=n[G],C=B.isInstancedMesh===!0?B.id:0,N=z[C];if(N!==void 0){for(let F in N){let V=N[F];for(let se in V)h(V[se].object),delete V[se];delete N[F]}delete z[C],Object.keys(z).length===0&&delete n[G]}}}function S(){I(),a=!0,r!==i&&(r=i,c(r.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:S,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function zM(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function VM(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(P){return!(P!==pn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let b=P===Qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Tn&&P!==fn&&!b&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(De("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),E=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:_,maxSamples:w,samples:E}}function kM(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Ln,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!i||p===null||p.length===0||r&&!m)r?h(null):c();else{let y=r?0:n,M=y*4,_=g.clippingState||null;l.value=_,_=h(p,d,M,f);for(let w=0;w!==M;++w)_[w]=t[w];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,p!==!0||m===null){let g=f+x*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,_=f;M!==x;++M,_+=4)a.copy(u[M]).applyMatrix4(y,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Ya=4,GM=6,HM=20,WM=256,Ec=new Ms,C0=new ze,xp=null,_p=0,yp=0,vp=!1,XM=new L,vr=new L,Cc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=XM}=r;xp=this._renderer.getRenderTarget(),_p=this._renderer.getActiveCubeFace(),yp=this._renderer.getActiveMipmapLevel(),vp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=I0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=P0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xp,_p,yp),this._renderer.xr.enabled=vp,e.scissorTest=!1,$a(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gi||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xp=this._renderer.getRenderTarget(),_p=this._renderer.getActiveCubeFace(),yp=this._renderer.getActiveMipmapLevel(),vp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:Qn,format:pn,colorSpace:jr,depthBuffer:!1},i=R0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=R0(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=qM(r)),this._blurMaterial=YM(r,e,t),this._ggxMaterial=$M(r,e,t)}return i}_compileMaterial(e){let t=new Et(new it,e);this._renderer.compile(t,Ec)}_sceneToCubeUV(e,t,n,i,r){let l=new Nt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(C0),u.toneMapping=jn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Et(new gs,new kn({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,g=!1,y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,g=!0):(m.color.copy(C0),g=!0);for(let M=0;M<6;M++){let _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let w=this._cubeSize;$a(i,_*w,M>2?w:0,w,w),u.setRenderTarget(i),g&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===gi||e.mapping===Ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=I0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=P0());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;$a(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ec)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:p}=this,x=this._sizeLods[n],m=3*x*(n>p-Ya?n-p+Ya:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,$a(r,m,g,3*x,2*x),i.setRenderTarget(r),i.render(o,Ec),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,$a(e,m,g,3*x,2*x),i.setRenderTarget(e),i.render(o,Ec)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],u=3*h*(i>this._lodMax-Ya?i-this._lodMax+Ya:0),d=4*(this._cubeSize-h);$a(t,u,d,3*h,2*h),a.setRenderTarget(t),a.render(l,Ec)}};function qM(s){let e=[],t=[],n=s,i=s-Ya+1+GM;for(let r=0;r<i;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,p=new Float32Array(f*d*u),x=new Float32Array(f*d*u);for(let g=0;g<u;g++){let y=g%3*2/3-1,M=g>2?0:-1,_=[y,M,0,y+2/3,M,0,y+2/3,M+1,0,y,M,0,y+2/3,M+1,0,y,M+1,0];p.set(_,f*d*g);for(let w=0;w<d;w++){let E=h[w*2]*2-1,P=h[w*2+1]*2-1;g===0?vr.set(1,P,E):g===1?vr.set(-E,1,-P):g===2?vr.set(-E,P,1):g===3?vr.set(-1,P,-E):g===4?vr.set(-E,-1,P):vr.set(E,P,-1),vr.toArray(x,(g*d+w)*f)}}let m=new it;m.setAttribute("position",new vt(p,f)),m.setAttribute("outputDirection",new vt(x,f)),t.push(new Et(m,null)),n>Ya&&n--}return{lodMeshes:t,sizeLods:e}}function R0(s,e,t){let n=new en(s,e,t);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $a(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function $M(s,e,t){return new tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:WM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:td(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function YM(s,e,t){return new tn({name:"SphericalGaussianBlur",defines:{SAMPLES:HM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:td(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function P0(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function I0(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function td(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Rc=class extends en{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new ms(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new gs(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:mi});r.uniforms.tEquirect.value=t;let a=new Et(i,r),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=Ct),new Il(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function ZM(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Na||f===Fa)if(e.has(d)){let p=e.get(d).texture;return o(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let x=new Rc(p.height);return x.fromEquirectangularTexture(s,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,p=f===Na||f===Fa,x=f===gi||f===Ji;if(p||x){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Cc(s)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let y=d.image;return p&&y&&y.height>0||x&&y&&l(y)?(n===null&&(n=new Cc(s)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===Na?d.mapping=gi:f===Fa&&(d.mapping=Ji),d}function l(d){let f=0,p=6;for(let x=0;x<p;x++)d[x]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function JM(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Si("WebGLRenderer: "+n+" extension not supported."),i}}}function KM(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,x=0;if(p===void 0)return;if(f!==null){let y=f.array;x=f.version;for(let M=0,_=y.length;M<_;M+=3){let w=y[M+0],E=y[M+1],P=y[M+2];d.push(w,E,E,P,P,w)}}else{let y=p.array;x=p.version;for(let M=0,_=y.length/3-1;M<_;M+=3){let w=M+0,E=M+1,P=M+2;d.push(w,E,E,P,P,w)}}let m=new(p.count>=65535?sa:ia)(d,1);m.version=x;let g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function jM(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function QM(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function eS(s,e,t){let n=new WeakMap,i=new ut;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let S=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],M=0;f===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let _=o.attributes.position.count*M,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let E=new Float32Array(_*w*4*u),P=new $s(E,_,w,u);P.type=fn,P.needsUpdate=!0;let b=M*4;for(let I=0;I<u;I++){let B=m[I],G=g[I],z=y[I],C=_*w*4*I;for(let N=0;N<B.count;N++){let F=N*b;f===!0&&(i.fromBufferAttribute(B,N),E[C+F+0]=i.x,E[C+F+1]=i.y,E[C+F+2]=i.z,E[C+F+3]=0),p===!0&&(i.fromBufferAttribute(G,N),E[C+F+4]=i.x,E[C+F+5]=i.y,E[C+F+6]=i.z,E[C+F+7]=0),x===!0&&(i.fromBufferAttribute(z,N),E[C+F+8]=i.x,E[C+F+9]=i.y,E[C+F+10]=i.z,E[C+F+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Me(_,w)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function tS(s,e,t,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var nS={[Fu]:"LINEAR_TONE_MAPPING",[Ou]:"REINHARD_TONE_MAPPING",[Bu]:"CINEON_TONE_MAPPING",[zu]:"ACES_FILMIC_TONE_MAPPING",[ku]:"AGX_TONE_MAPPING",[Gu]:"NEUTRAL_TONE_MAPPING",[Vu]:"CUSTOM_TONE_MAPPING"};function iS(s,e,t,n,i,r){let a=new en(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new it;c.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let h=new _a({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Et(c,h),d=new Ms(-1,1,1,-1,0,1),f=null,p=null,x=!1,m,g=null,y=[],M=!1;this.setSize=function(_,w){a.setSize(_,w),o!==null&&o.setSize(_,w),l!==null&&l.setSize(_,w);for(let E=0;E<y.length;E++){let P=y[E];P.setSize&&P.setSize(_,w)}},this.setEffects=function(_){y=_,M=y.length>0&&y[0].isRenderPass===!0;let w=a.width,E=a.height;y.length>0&&o===null&&(o=new en(w,E,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),l=new en(w,E,{type:Qn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<y.length;P++){let b=y[P];b.setSize&&b.setSize(w,E)}},this.begin=function(_,w){if(x||_.toneMapping===jn&&y.length===0)return!1;if(g=w,w!==null){let E=w.width,P=w.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return M===!1&&_.setRenderTarget(a),m=_.toneMapping,_.toneMapping=jn,!0},this.hasRenderPass=function(){return M},this.end=function(_,w){_.toneMapping=m,x=!0;let E=a,P=o;for(let b=0;b<y.length;b++){let S=y[b];S.enabled!==!1&&(S.render(_,P,E,w),S.needsSwap!==!1&&(E=P,P=P===o?l:o))}if(f!==_.outputColorSpace||p!==_.toneMapping){f=_.outputColorSpace,p=_.toneMapping,h.defines={},lt.getTransfer(f)===mt&&(h.defines.SRGB_TRANSFER="");let b=nS[p];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(g),_.render(u,d),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var K0=new Ot,Sp=new Hi(1,1),j0=new $s,Q0=new Ys,ex=new ms,L0=[],D0=[],U0=new Float32Array(16),N0=new Float32Array(9),F0=new Float32Array(4);function Ja(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=L0[i];if(r===void 0&&(r=new Float32Array(i),L0[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function qt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function $t(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function nd(s,e){let t=D0[e];t===void 0&&(t=new Int32Array(e),D0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function sS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function rS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2fv(this.addr,e),$t(t,e)}}function aS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;s.uniform3fv(this.addr,e),$t(t,e)}}function oS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4fv(this.addr,e),$t(t,e)}}function lS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;F0.set(n),s.uniformMatrix2fv(this.addr,!1,F0),$t(t,n)}}function cS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;N0.set(n),s.uniformMatrix3fv(this.addr,!1,N0),$t(t,n)}}function hS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(qt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(qt(t,n))return;U0.set(n),s.uniformMatrix4fv(this.addr,!1,U0),$t(t,n)}}function uS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function dS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2iv(this.addr,e),$t(t,e)}}function fS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3iv(this.addr,e),$t(t,e)}}function pS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4iv(this.addr,e),$t(t,e)}}function mS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function gS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;s.uniform2uiv(this.addr,e),$t(t,e)}}function xS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;s.uniform3uiv(this.addr,e),$t(t,e)}}function _S(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;s.uniform4uiv(this.addr,e),$t(t,e)}}function yS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Sp.compareFunction=t.isReversedDepthBuffer()?Sc:Mc,r=Sp):r=K0,t.setTexture2D(e||r,i)}function vS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Q0,i)}function bS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ex,i)}function MS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||j0,i)}function SS(s){switch(s){case 5126:return sS;case 35664:return rS;case 35665:return aS;case 35666:return oS;case 35674:return lS;case 35675:return cS;case 35676:return hS;case 5124:case 35670:return uS;case 35667:case 35671:return dS;case 35668:case 35672:return fS;case 35669:case 35673:return pS;case 5125:return mS;case 36294:return gS;case 36295:return xS;case 36296:return _S;case 35678:case 36198:case 36298:case 36306:case 35682:return yS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return bS;case 36289:case 36303:case 36311:case 36292:return MS}}function wS(s,e){s.uniform1fv(this.addr,e)}function ES(s,e){let t=Ja(e,this.size,2);s.uniform2fv(this.addr,t)}function TS(s,e){let t=Ja(e,this.size,3);s.uniform3fv(this.addr,t)}function AS(s,e){let t=Ja(e,this.size,4);s.uniform4fv(this.addr,t)}function CS(s,e){let t=Ja(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function RS(s,e){let t=Ja(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function PS(s,e){let t=Ja(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function IS(s,e){s.uniform1iv(this.addr,e)}function LS(s,e){s.uniform2iv(this.addr,e)}function DS(s,e){s.uniform3iv(this.addr,e)}function US(s,e){s.uniform4iv(this.addr,e)}function NS(s,e){s.uniform1uiv(this.addr,e)}function FS(s,e){s.uniform2uiv(this.addr,e)}function OS(s,e){s.uniform3uiv(this.addr,e)}function BS(s,e){s.uniform4uiv(this.addr,e)}function zS(s,e,t){let n=this.cache,i=e.length,r=nd(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),$t(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Sp:a=K0;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function VS(s,e,t){let n=this.cache,i=e.length,r=nd(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Q0,r[a])}function kS(s,e,t){let n=this.cache,i=e.length,r=nd(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||ex,r[a])}function GS(s,e,t){let n=this.cache,i=e.length,r=nd(t,i);qt(n,r)||(s.uniform1iv(this.addr,r),$t(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||j0,r[a])}function HS(s){switch(s){case 5126:return wS;case 35664:return ES;case 35665:return TS;case 35666:return AS;case 35674:return CS;case 35675:return RS;case 35676:return PS;case 5124:case 35670:return IS;case 35667:case 35671:return LS;case 35668:case 35672:return DS;case 35669:case 35673:return US;case 5125:return NS;case 36294:return FS;case 36295:return OS;case 36296:return BS;case 35678:case 36198:case 36298:case 36306:case 35682:return zS;case 35679:case 36299:case 36307:return VS;case 35680:case 36300:case 36308:case 36293:return kS;case 36289:case 36303:case 36311:case 36292:return GS}}var wp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=SS(t.type)}},Ep=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HS(t.type)}},Tp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},bp=/(\w+)(\])?(\[|\.)?/g;function O0(s,e){s.seq.push(e),s.map[e.id]=e}function WS(s,e,t){let n=s.name,i=n.length;for(bp.lastIndex=0;;){let r=bp.exec(n),a=bp.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){O0(t,c===void 0?new wp(o,s,e):new Ep(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Tp(o),O0(t,u)),t=u}}}var Za=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);WS(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function B0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var XS=37297,qS=0;function $S(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var z0=new tt;function YS(s){lt._getMatrix(z0,lt.workingColorSpace,s);let e=`mat3( ${z0.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(s)){case Qr:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function V0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+$S(s.getShaderSource(e),o)}else return r}function ZS(s,e){let t=YS(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var JS={[Fu]:"Linear",[Ou]:"Reinhard",[Bu]:"Cineon",[zu]:"ACESFilmic",[ku]:"AgX",[Gu]:"Neutral",[Vu]:"Custom"};function KS(s,e){let t=JS[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ed=new L;function jS(){lt.getLuminanceCoefficients(ed);let s=ed.x.toFixed(4),e=ed.y.toFixed(4),t=ed.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ac).join(`
`)}function e1(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function t1(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ac(s){return s!==""}function k0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function G0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var n1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ap(s){return s.replace(n1,s1)}var i1=new Map;function s1(s,e){let t=rt[e];if(t===void 0){let n=i1.get(e);if(n!==void 0)t=rt[n],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ap(t)}var r1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function H0(s){return s.replace(r1,a1)}function a1(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function W0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var o1={[Da]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function l1(s){return o1[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var c1={[gi]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[mr]:"ENVMAP_TYPE_CUBE_UV"};function h1(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":c1[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var u1={[Ji]:"ENVMAP_MODE_REFRACTION"};function d1(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":u1[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var f1={[Ua]:"ENVMAP_BLENDING_MULTIPLY",[Wf]:"ENVMAP_BLENDING_MIX",[Xf]:"ENVMAP_BLENDING_ADD"};function p1(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":f1[s.combine]||"ENVMAP_BLENDING_NONE"}function m1(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function g1(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=l1(t),c=h1(t),h=d1(t),u=p1(t),d=m1(t),f=QS(t),p=e1(r),x=i.createProgram(),m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ac).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Ac).join(`
`),g.length>0&&(g+=`
`)):(m=[W0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ac).join(`
`),g=[W0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?rt.tonemapping_pars_fragment:"",t.toneMapping!==jn?KS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,ZS("linearToOutputTexel",t.outputColorSpace),jS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ac).join(`
`)),a=Ap(a),a=k0(a,t),a=G0(a,t),o=Ap(o),o=k0(o,t),o=G0(o,t),a=H0(a),o=H0(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Ku?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ku?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=y+m+a,_=y+g+o,w=B0(i,i.VERTEX_SHADER,M),E=B0(i,i.FRAGMENT_SHADER,_);i.attachShader(x,w),i.attachShader(x,E),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function P(B){if(s.debug.checkShaderErrors){let G=i.getProgramInfoLog(x)||"",z=i.getShaderInfoLog(w)||"",C=i.getShaderInfoLog(E)||"",N=G.trim(),F=z.trim(),V=C.trim(),se=!0,J=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(se=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,w,E);else{let Z=V0(i,w,"vertex"),k=V0(i,E,"fragment");Je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+N+`
`+Z+`
`+k)}else N!==""?De("WebGLProgram: Program Info Log:",N):(F===""||V==="")&&(J=!1);J&&(B.diagnostics={runnable:se,programLog:N,vertexShader:{log:F,prefix:m},fragmentShader:{log:V,prefix:g}})}i.deleteShader(w),i.deleteShader(E),b=new Za(i,x),S=t1(i,x)}let b;this.getUniforms=function(){return b===void 0&&P(this),b};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(x,XS)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qS++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}var x1=0,Cp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Rp(e),t.set(e,n)),n}},Rp=class{constructor(e){this.id=x1++,this.code=e,this.usedTimes=0}};function _1(s){return s===ji||s===Ha||s===Wa}function y1(s,e,t,n,i,r){let a=new Zs,o=new Cp,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function x(b,S,I,B,G,z){let C=B.fog,N=G.geometry,F=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?B.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,se=e.get(b.envMap||F,V),J=se&&se.mapping===mr?se.image.height:null,Z=f[b.type];b.precision!==null&&(d=n.getMaxPrecision(b.precision),d!==b.precision&&De("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let k=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,H=k!==void 0?k.length:0,D=0;N.morphAttributes.position!==void 0&&(D=1),N.morphAttributes.normal!==void 0&&(D=2),N.morphAttributes.color!==void 0&&(D=3);let ee,O,ce,q;if(Z){let gt=_n[Z];ee=gt.vertexShader,O=gt.fragmentShader}else{ee=b.vertexShader,O=b.fragmentShader;let gt=o.getVertexShaderStage(b),xt=o.getFragmentShaderStage(b);o.update(b,gt,xt),ce=gt.id,q=xt.id}let $=s.getRenderTarget(),Y=s.state.buffers.depth.getReversed(),ne=G.isInstancedMesh===!0,le=G.isBatchedMesh===!0,he=!!b.map,Ae=!!b.matcap,re=!!se,ie=!!b.aoMap,pe=!!b.lightMap,ve=!!b.bumpMap&&b.wireframe===!1,we=!!b.normalMap,ke=!!b.displacementMap,Ue=!!b.emissiveMap,Re=!!b.metalnessMap,Q=!!b.roughnessMap,U=b.anisotropy>0,Te=b.clearcoat>0,ye=b.dispersion>0,R=b.retroreflectivity>0,v=b.iridescence>0,X=b.sheen>0,W=b.transmission>0,te=U&&!!b.anisotropyMap,_e=Te&&!!b.clearcoatMap,xe=Te&&!!b.clearcoatNormalMap,ae=Te&&!!b.clearcoatRoughnessMap,fe=v&&!!b.iridescenceMap,Ce=v&&!!b.iridescenceThicknessMap,qe=X&&!!b.sheenColorMap,Ee=X&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,$e=!!b.specularColorMap,je=!!b.specularIntensityMap,nt=W&&!!b.transmissionMap,j=W&&!!b.thicknessMap,Le=!!b.gradientMap,be=!!b.alphaMap,Ne=b.alphaTest>0,Oe=!!b.alphaHash,Se=!!b.extensions,He=jn;b.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(He=s.toneMapping);let Ge={shaderID:Z,shaderType:b.type,shaderName:b.name,vertexShader:ee,fragmentShader:O,defines:b.defines,customVertexShaderID:ce,customFragmentShaderID:q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:le,batchingColor:le&&G._colorsTexture!==null,instancing:ne,instancingColor:ne&&G.instanceColor!==null,instancingMorph:ne&&G.morphTexture!==null,outputColorSpace:$===null?s.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:he,matcap:Ae,envMap:re,envMapMode:re&&se.mapping,envMapCubeUVHeight:J,aoMap:ie,lightMap:pe,bumpMap:ve,normalMap:we,displacementMap:ke,emissiveMap:Ue,normalMapObjectSpace:we&&b.normalMapType===Kf,normalMapTangentSpace:we&&b.normalMapType===Ai,packedNormalMap:we&&b.normalMapType===Ai&&_1(b.normalMap.format),metalnessMap:Re,roughnessMap:Q,anisotropy:U,anisotropyMap:te,clearcoat:Te,clearcoatMap:_e,clearcoatNormalMap:xe,clearcoatRoughnessMap:ae,dispersion:ye,retroreflection:R,iridescence:v,iridescenceMap:fe,iridescenceThicknessMap:Ce,sheen:X,sheenColorMap:qe,sheenRoughnessMap:Ee,specularMap:Pe,specularColorMap:$e,specularIntensityMap:je,transmission:W,transmissionMap:nt,thicknessMap:j,gradientMap:Le,opaque:b.transparent===!1&&b.blending===pr&&b.alphaToCoverage===!1,alphaMap:be,alphaTest:Ne,alphaHash:Oe,combine:b.combine,mapUv:he&&p(b.map.channel),aoMapUv:ie&&p(b.aoMap.channel),lightMapUv:pe&&p(b.lightMap.channel),bumpMapUv:ve&&p(b.bumpMap.channel),normalMapUv:we&&p(b.normalMap.channel),displacementMapUv:ke&&p(b.displacementMap.channel),emissiveMapUv:Ue&&p(b.emissiveMap.channel),metalnessMapUv:Re&&p(b.metalnessMap.channel),roughnessMapUv:Q&&p(b.roughnessMap.channel),anisotropyMapUv:te&&p(b.anisotropyMap.channel),clearcoatMapUv:_e&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:xe&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&p(b.sheenRoughnessMap.channel),specularMapUv:Pe&&p(b.specularMap.channel),specularColorMapUv:$e&&p(b.specularColorMap.channel),specularIntensityMapUv:je&&p(b.specularIntensityMap.channel),transmissionMapUv:nt&&p(b.transmissionMap.channel),thicknessMapUv:j&&p(b.thicknessMap.channel),alphaMapUv:be&&p(b.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(we||U),vertexNormals:!!N.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!N.attributes.uv&&(he||be),fog:!!C,useFog:b.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||N.attributes.normal===void 0&&we===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Y,skinning:G.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:D,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:He,decodeVideoTexture:he&&b.map.isVideoTexture===!0&&lt.getTransfer(b.map.colorSpace)===mt,decodeVideoTextureEmissive:Ue&&b.emissiveMap.isVideoTexture===!0&&lt.getTransfer(b.emissiveMap.colorSpace)===mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===pi,flipSided:b.side===gn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Se&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&b.extensions.multiDraw===!0||le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ge.vertexUv1s=l.has(1),Ge.vertexUv2s=l.has(2),Ge.vertexUv3s=l.has(3),l.clear(),Ge}function m(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)S.push(I),S.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(g(S,b),y(S,b),S.push(s.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function g(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numSunLights),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numSunLightShadows),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function M(b){let S=f[b.type],I;if(S){let B=_n[S];I=qa.clone(B.uniforms)}else I=b.uniforms;return I}function _(b,S){let I=h.get(S);return I!==void 0?++I.usedTimes:(I=new g1(s,S,b,i),c.push(I),h.set(S,I)),I}function w(b){if(--b.usedTimes===0){let S=c.indexOf(b);c[S]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function E(b){o.remove(b)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:M,acquireProgram:_,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:P}}function v1(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function b1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function X0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function q0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,p,x,m,g){let y=s[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:p,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:g},s[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=p,y.materialVariant=a(d),y.groupOrder=x,y.renderOrder=d.renderOrder,y.z=m,y.group=g),e++,y}function l(d,f,p,x,m,g,y){y.reversedDepth===!0&&(m=-m);let M=o(d,f,p,x,m,g);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):t.push(M)}function c(d,f,p,x,m,g){let y=o(d,f,p,x,m,g);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):t.unshift(y)}function h(d,f){t.length>1&&t.sort(d||b1),n.length>1&&n.sort(f||X0),i.length>1&&i.sort(f||X0)}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function M1(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new q0,s.set(n,[a])):i>=r.length?(a=new q0,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function S1(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new ze};break;case"SpotLight":t={position:new L,direction:new L,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function w1(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var E1=0;function T1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function A1(s){let e=new S1,t=w1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,r=new Qe,a=new Qe;function o(c){let h=0,u=0,d=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let f=0,p=0,x=0,m=0,g=0,y=0,M=0,_=0,w=0,E=0,P=0,b=0,S=0,I=0;c.sort(T1);for(let G=0,z=c.length;G<z;G++){let C=c[G],N=C.color,F=C.intensity,V=C.distance,se=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ji?se=C.shadow.map.texture:se=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*F,u+=N.g*F,d+=N.b*F;else if(C.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(C.sh.coefficients[J],F);I++}else if(C.isSunLight){let J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Z=C.shadow,k=t.get(C);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[p]=k,n.sunShadowMap[p]=se;let H=Z.getViewportCount();for(let D=0;D<H;D++)n.sunShadowMatrix[x+D]=Z.getMatrix(D),n.sunShadowCascade[x+D]=Z._cascadeData[D];x+=H,p++}n.sun[f]=J,f++}else if(C.isDirectionalLight){let J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Z=C.shadow,k=t.get(C);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=se,n.directionalShadowMatrix[m]=C.shadow.matrix,w++}n.directional[m]=J,m++}else if(C.isSpotLight){let J=e.get(C);J.position.setFromMatrixPosition(C.matrixWorld),J.color.copy(N).multiplyScalar(F),J.distance=V,J.coneCos=Math.cos(C.angle),J.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),J.decay=C.decay,n.spot[y]=J;let Z=C.shadow;if(C.map&&(n.spotLightMap[b]=C.map,b++,Z.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[y]=Z.matrix,C.castShadow){let k=t.get(C);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,n.spotShadow[y]=k,n.spotShadowMap[y]=se,P++}y++}else if(C.isRectAreaLight){let J=e.get(C);J.color.copy(N).multiplyScalar(F),J.halfWidth.set(C.width*.5,0,0),J.halfHeight.set(0,C.height*.5,0),n.rectArea[M]=J,M++}else if(C.isPointLight){let J=e.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),J.distance=C.distance,J.decay=C.decay,C.castShadow){let Z=C.shadow,k=t.get(C);k.shadowIntensity=Z.intensity,k.shadowBias=Z.bias,k.shadowNormalBias=Z.normalBias,k.shadowRadius=Z.radius,k.shadowMapSize=Z.mapSize,k.shadowCameraNear=Z.camera.near,k.shadowCameraFar=Z.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=se,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=J,g++}else if(C.isHemisphereLight){let J=e.get(C);J.skyColor.copy(C.color).multiplyScalar(F),J.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[_]=J,_++}}M>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let B=n.hash;(B.sunLength!==f||B.directionalLength!==m||B.pointLength!==g||B.spotLength!==y||B.rectAreaLength!==M||B.hemiLength!==_||B.numSunShadows!==p||B.numDirectionalShadows!==w||B.numPointShadows!==E||B.numSpotShadows!==P||B.numSpotMaps!==b||B.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=m,n.spot.length=y,n.rectArea.length=M,n.point.length=g,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=I,B.sunLength=f,B.directionalLength=m,B.pointLength=g,B.spotLength=y,B.rectAreaLength=M,B.hemiLength=_,B.numSunShadows=p,B.numDirectionalShadows=w,B.numPointShadows=E,B.numSpotShadows=P,B.numSpotMaps=b,B.numLightProbes=I,n.version=E1++)}function l(c,h){let u=0,d=0,f=0,p=0,x=0,m=0,g=h.matrixWorldInverse;for(let y=0,M=c.length;y<M;y++){let _=c[y];if(_.isSunLight){let w=n.sun[u];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(g),u++}else if(_.isDirectionalLight){let w=n.directional[d];w.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),d++}else if(_.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),p++}else if(_.isRectAreaLight){let w=n.rectArea[x];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(_.width*.5,0,0),w.halfHeight.set(0,_.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){let w=n.point[f];w.position.setFromMatrixPosition(_.matrixWorld),w.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){let w=n.hemi[m];w.direction.setFromMatrixPosition(_.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:n}}function $0(s){let e=new A1(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function C1(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new $0(s),e.set(i,[o])):r>=a.length?(o=new $0(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var R1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,I1=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],L1=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Y0=new Qe,Tc=new L,Mp=new L;function D1(s,e,t){let n=new wi,i=new Me,r=new Me,a=new ut,o=new va,l=new ba,c={},h=t.maxTextureSize,u={[Zi]:gn,[gn]:Zi,[pi]:pi},d=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:R1,fragmentShader:P1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new it;p.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Et(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Da;let g=this.type;this.render=function(E,P,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Ef&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Da);let S=s.getRenderTarget(),I=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),G=s.state;G.setBlending(mi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let z=g!==this.type;z&&P.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(N=>N.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,N=E.length;C<N;C++){let F=E[C],V=F.shadow;if(V===void 0){De("WebGLShadowMap:",F,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);let se=V.getFrameExtents();i.multiply(se),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/se.x),i.x=r.x*se.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/se.y),i.y=r.y*se.y,V.mapSize.y=r.y));let J=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=J,V.map===null||z===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===fr){if(F.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new en(i.x,i.y,{format:ji,type:Qn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),V.map.texture.name=F.name+".shadowMap",V.map.depthTexture=new Hi(i.x,i.y,fn),V.map.depthTexture.name=F.name+".shadowMapDepth",V.map.depthTexture.format=hi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft}else F.isPointLight?(V.map=new Rc(i.x),V.map.depthTexture=new Wo(i.x,Hn)):(V.map=new en(i.x,i.y),V.map.depthTexture=new Hi(i.x,i.y,Hn)),V.map.depthTexture.name=F.name+".shadowMap",V.map.depthTexture.format=hi,this.type===Da?(V.map.depthTexture.compareFunction=J?Sc:Mc,V.map.depthTexture.minFilter=Ct,V.map.depthTexture.magFilter=Ct):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==i.x||V.map.height!==i.y)&&V.map.setSize(i.x,i.y);let Z=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();F.isPointLight!==!0&&V.updateMatrices(F,b);for(let k=0;k<Z;k++){let H=V.getCamera(k);if(F.isPointLight){let D=V.camera,ee=V.matrix,O=F.distance||D.far;O!==D.far&&(D.far=O,D.updateProjectionMatrix()),Tc.setFromMatrixPosition(F.matrixWorld),D.position.copy(Tc),Mp.copy(D.position),Mp.add(I1[k]),D.up.copy(L1[k]),D.lookAt(Mp),D.updateMatrixWorld(),ee.makeTranslation(-Tc.x,-Tc.y,-Tc.z),Y0.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Y0,D.coordinateSystem,D.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,k),s.clear();else{k===0&&(s.setRenderTarget(V.map),s.clear());let D=V.getViewport(k);a.set(r.x*D.x,r.y*D.y,r.x*D.z,r.y*D.w),G.viewport(a)}n=V.getFrustum(k),_(P,b,H,F,this.type)}V.isPointLightShadow!==!0&&this.type===fr&&y(V,b),V.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(S,I,B)};function y(E,P){let b=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new en(i.x,i.y,{format:ji,type:Qn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(P,null,b,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(P,null,b,f,x,null)}function M(E,P,b,S){let I=null,B=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(B!==void 0)I=B;else if(I=b.isPointLight===!0?l:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let G=I.uuid,z=P.uuid,C=c[G];C===void 0&&(C={},c[G]=C);let N=C[z];N===void 0&&(N=I.clone(),C[z]=N,P.addEventListener("dispose",w)),I=N}if(I.visible=P.visible,I.wireframe=P.wireframe,S===fr?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:u[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let G=s.properties.get(I);G.light=b}return I}function _(E,P,b,S,I){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===fr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);let z=e.update(E),C=E.material;if(Array.isArray(C)){let N=z.groups;for(let F=0,V=N.length;F<V;F++){let se=N[F],J=C[se.materialIndex];if(J&&J.visible){let Z=M(E,J,S,I);E.onBeforeShadow(s,E,P,b,z,Z,se),s.renderBufferDirect(b,null,z,Z,E,se),E.onAfterShadow(s,E,P,b,z,Z,se)}}}else if(C.visible){let N=M(E,C,S,I);E.onBeforeShadow(s,E,P,b,z,N,null),s.renderBufferDirect(b,null,z,N,E,null),E.onAfterShadow(s,E,P,b,z,N,null)}}let G=E.children;for(let z=0,C=G.length;z<C;z++)_(G[z],P,b,S,I)}function w(E){E.target.removeEventListener("dispose",w);for(let b in c){let S=c[b],I=E.target.uuid;I in S&&(S[I].dispose(),delete S[I])}}}function U1(s,e){function t(){let j=!1,Le=new ut,be=null,Ne=new ut(0,0,0,0);return{setMask:function(Oe){be!==Oe&&!j&&(s.colorMask(Oe,Oe,Oe,Oe),be=Oe)},setLocked:function(Oe){j=Oe},setClear:function(Oe,Se,He,Ge,gt){gt===!0&&(Oe*=Ge,Se*=Ge,He*=Ge),Le.set(Oe,Se,He,Ge),Ne.equals(Le)===!1&&(s.clearColor(Oe,Se,He,Ge),Ne.copy(Le))},reset:function(){j=!1,be=null,Ne.set(-1,0,0,0)}}}function n(){let j=!1,Le=!1,be=null,Ne=null,Oe=null;return{setReversed:function(Se){if(Le!==Se){let He=e.get("EXT_clip_control");Se?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Le=Se;let Ge=Oe;Oe=null,this.setClear(Ge)}},getReversed:function(){return Le},setTest:function(Se){Se?$(s.DEPTH_TEST):Y(s.DEPTH_TEST)},setMask:function(Se){be!==Se&&!j&&(s.depthMask(Se),be=Se)},setFunc:function(Se){if(Le&&(Se=x0[Se]),Ne!==Se){switch(Se){case wo:s.depthFunc(s.NEVER);break;case Eo:s.depthFunc(s.ALWAYS);break;case To:s.depthFunc(s.LESS);break;case Xs:s.depthFunc(s.LEQUAL);break;case Ao:s.depthFunc(s.EQUAL);break;case Co:s.depthFunc(s.GEQUAL);break;case Ro:s.depthFunc(s.GREATER);break;case Po:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ne=Se}},setLocked:function(Se){j=Se},setClear:function(Se){Oe!==Se&&(Oe=Se,Le&&(Se=1-Se),s.clearDepth(Se))},reset:function(){j=!1,be=null,Ne=null,Oe=null,Le=!1}}}function i(){let j=!1,Le=null,be=null,Ne=null,Oe=null,Se=null,He=null,Ge=null,gt=null;return{setTest:function(xt){j||(xt?$(s.STENCIL_TEST):Y(s.STENCIL_TEST))},setMask:function(xt){Le!==xt&&!j&&(s.stencilMask(xt),Le=xt)},setFunc:function(xt,ni,yi){(be!==xt||Ne!==ni||Oe!==yi)&&(s.stencilFunc(xt,ni,yi),be=xt,Ne=ni,Oe=yi)},setOp:function(xt,ni,yi){(Se!==xt||He!==ni||Ge!==yi)&&(s.stencilOp(xt,ni,yi),Se=xt,He=ni,Ge=yi)},setLocked:function(xt){j=xt},setClear:function(xt){gt!==xt&&(s.clearStencil(xt),gt=xt)},reset:function(){j=!1,Le=null,be=null,Ne=null,Oe=null,Se=null,He=null,Ge=null,gt=null}}}let r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,y=null,M=null,_=null,w=null,E=null,P=null,b=new ze(0,0,0),S=0,I=!1,B=null,G=null,z=null,C=null,N=null,F=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,se=0,J=s.getParameter(s.VERSION);J.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(J)[1]),V=se>=1):J.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),V=se>=2);let Z=null,k={},H=s.getParameter(s.SCISSOR_BOX),D=s.getParameter(s.VIEWPORT),ee=new ut().fromArray(H),O=new ut().fromArray(D);function ce(j,Le,be,Ne){let Oe=new Uint8Array(4),Se=s.createTexture();s.bindTexture(j,Se),s.texParameteri(j,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(j,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let He=0;He<be;He++)j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?s.texImage3D(Le,0,s.RGBA,1,1,Ne,0,s.RGBA,s.UNSIGNED_BYTE,Oe):s.texImage2D(Le+He,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Oe);return Se}let q={};q[s.TEXTURE_2D]=ce(s.TEXTURE_2D,s.TEXTURE_2D,1),q[s.TEXTURE_CUBE_MAP]=ce(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[s.TEXTURE_2D_ARRAY]=ce(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),q[s.TEXTURE_3D]=ce(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(s.DEPTH_TEST),a.setFunc(Xs),ve(!1),we(Pu),$(s.CULL_FACE),ie(mi);function $(j){h[j]!==!0&&(s.enable(j),h[j]=!0)}function Y(j){h[j]!==!1&&(s.disable(j),h[j]=!1)}function ne(j,Le){return d[j]!==Le?(s.bindFramebuffer(j,Le),d[j]=Le,j===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Le),j===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Le),!0):!1}function le(j,Le){let be=p,Ne=!1;if(j){be=f.get(Le),be===void 0&&(be=[],f.set(Le,be));let Oe=j.textures;if(be.length!==Oe.length||be[0]!==s.COLOR_ATTACHMENT0){for(let Se=0,He=Oe.length;Se<He;Se++)be[Se]=s.COLOR_ATTACHMENT0+Se;be.length=Oe.length,Ne=!0}}else be[0]!==s.BACK&&(be[0]=s.BACK,Ne=!0);Ne&&s.drawBuffers(be)}function he(j){return x!==j?(s.useProgram(j),x=j,!0):!1}let Ae={[Ss]:s.FUNC_ADD,[Af]:s.FUNC_SUBTRACT,[Cf]:s.FUNC_REVERSE_SUBTRACT};Ae[Rf]=s.MIN,Ae[Pf]=s.MAX;let re={[If]:s.ZERO,[Lf]:s.ONE,[Df]:s.SRC_COLOR,[Uu]:s.SRC_ALPHA,[zf]:s.SRC_ALPHA_SATURATE,[Of]:s.DST_COLOR,[Nf]:s.DST_ALPHA,[Uf]:s.ONE_MINUS_SRC_COLOR,[Nu]:s.ONE_MINUS_SRC_ALPHA,[Bf]:s.ONE_MINUS_DST_COLOR,[Ff]:s.ONE_MINUS_DST_ALPHA,[Vf]:s.CONSTANT_COLOR,[kf]:s.ONE_MINUS_CONSTANT_COLOR,[Gf]:s.CONSTANT_ALPHA,[Hf]:s.ONE_MINUS_CONSTANT_ALPHA};function ie(j,Le,be,Ne,Oe,Se,He,Ge,gt,xt){if(j===mi){m===!0&&(Y(s.BLEND),m=!1);return}if(m===!1&&($(s.BLEND),m=!0),j!==Tf){if(j!==g||xt!==I){if((y!==Ss||w!==Ss)&&(s.blendEquation(s.FUNC_ADD),y=Ss,w=Ss),xt)switch(j){case pr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Iu:s.blendFunc(s.ONE,s.ONE);break;case Lu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Du:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",j);break}else switch(j){case pr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Iu:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lu:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Du:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",j);break}M=null,_=null,E=null,P=null,b.set(0,0,0),S=0,g=j,I=xt}return}Oe=Oe||Le,Se=Se||be,He=He||Ne,(Le!==y||Oe!==w)&&(s.blendEquationSeparate(Ae[Le],Ae[Oe]),y=Le,w=Oe),(be!==M||Ne!==_||Se!==E||He!==P)&&(s.blendFuncSeparate(re[be],re[Ne],re[Se],re[He]),M=be,_=Ne,E=Se,P=He),(Ge.equals(b)===!1||gt!==S)&&(s.blendColor(Ge.r,Ge.g,Ge.b,gt),b.copy(Ge),S=gt),g=j,I=!1}function pe(j,Le){j.side===pi?Y(s.CULL_FACE):$(s.CULL_FACE);let be=j.side===gn;Le&&(be=!be),ve(be),j.blending===pr&&j.transparent===!1?ie(mi):ie(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),a.setFunc(j.depthFunc),a.setTest(j.depthTest),a.setMask(j.depthWrite),r.setMask(j.colorWrite);let Ne=j.stencilWrite;o.setTest(Ne),Ne&&(o.setMask(j.stencilWriteMask),o.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),o.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),Ue(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?$(s.SAMPLE_ALPHA_TO_COVERAGE):Y(s.SAMPLE_ALPHA_TO_COVERAGE)}function ve(j){B!==j&&(j?s.frontFace(s.CW):s.frontFace(s.CCW),B=j)}function we(j){j!==Sf?($(s.CULL_FACE),j!==G&&(j===Pu?s.cullFace(s.BACK):j===wf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Y(s.CULL_FACE),G=j}function ke(j){j!==z&&(V&&s.lineWidth(j),z=j)}function Ue(j,Le,be){j?($(s.POLYGON_OFFSET_FILL),(C!==Le||N!==be)&&(C=Le,N=be,a.getReversed()&&(Le=-Le),s.polygonOffset(Le,be))):Y(s.POLYGON_OFFSET_FILL)}function Re(j){j?$(s.SCISSOR_TEST):Y(s.SCISSOR_TEST)}function Q(j){j===void 0&&(j=s.TEXTURE0+F-1),Z!==j&&(s.activeTexture(j),Z=j)}function U(j,Le,be){be===void 0&&(Z===null?be=s.TEXTURE0+F-1:be=Z);let Ne=k[be];Ne===void 0&&(Ne={type:void 0,texture:void 0},k[be]=Ne),(Ne.type!==j||Ne.texture!==Le)&&(Z!==be&&(s.activeTexture(be),Z=be),s.bindTexture(j,Le||q[j]),Ne.type=j,Ne.texture=Le)}function Te(){let j=k[Z];j!==void 0&&j.type!==void 0&&(s.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function ye(){try{s.compressedTexImage2D(...arguments)}catch(j){Je("WebGLState:",j)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(j){Je("WebGLState:",j)}}function v(){try{s.texSubImage2D(...arguments)}catch(j){Je("WebGLState:",j)}}function X(){try{s.texSubImage3D(...arguments)}catch(j){Je("WebGLState:",j)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(j){Je("WebGLState:",j)}}function te(){try{s.compressedTexSubImage3D(...arguments)}catch(j){Je("WebGLState:",j)}}function _e(){try{s.texStorage2D(...arguments)}catch(j){Je("WebGLState:",j)}}function xe(){try{s.texStorage3D(...arguments)}catch(j){Je("WebGLState:",j)}}function ae(){try{s.texImage2D(...arguments)}catch(j){Je("WebGLState:",j)}}function fe(){try{s.texImage3D(...arguments)}catch(j){Je("WebGLState:",j)}}function Ce(j){return u[j]!==void 0?u[j]:s.getParameter(j)}function qe(j,Le){u[j]!==Le&&(s.pixelStorei(j,Le),u[j]=Le)}function Ee(j){ee.equals(j)===!1&&(s.scissor(j.x,j.y,j.z,j.w),ee.copy(j))}function Pe(j){O.equals(j)===!1&&(s.viewport(j.x,j.y,j.z,j.w),O.copy(j))}function $e(j,Le){let be=c.get(Le);be===void 0&&(be=new WeakMap,c.set(Le,be));let Ne=be.get(j);Ne===void 0&&(Ne=s.getUniformBlockIndex(Le,j.name),be.set(j,Ne))}function je(j,Le){let Ne=c.get(Le).get(j);l.get(Le)!==Ne&&(s.uniformBlockBinding(Le,Ne,j.__bindingPointIndex),l.set(Le,Ne))}function nt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},Z=null,k={},d={},f=new WeakMap,p=[],x=null,m=!1,g=null,y=null,M=null,_=null,w=null,E=null,P=null,b=new ze(0,0,0),S=0,I=!1,B=null,G=null,z=null,C=null,N=null,ee.set(0,0,s.canvas.width,s.canvas.height),O.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:Y,bindFramebuffer:ne,drawBuffers:le,useProgram:he,setBlending:ie,setMaterial:pe,setFlipSided:ve,setCullFace:we,setLineWidth:ke,setPolygonOffset:Ue,setScissorTest:Re,activeTexture:Q,bindTexture:U,unbindTexture:Te,compressedTexImage2D:ye,compressedTexImage3D:R,texImage2D:ae,texImage3D:fe,pixelStorei:qe,getParameter:Ce,updateUBOMapping:$e,uniformBlockBinding:je,texStorage2D:_e,texStorage3D:xe,texSubImage2D:v,texSubImage3D:X,compressedTexSubImage2D:W,compressedTexSubImage3D:te,scissor:Ee,viewport:Pe,reset:nt}}function N1(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,v){return p?new OffscreenCanvas(R,v):ea("canvas")}function m(R,v,X){let W=1,te=ye(R);if((te.width>X||te.height>X)&&(W=X/Math.max(te.width,te.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let _e=Math.floor(W*te.width),xe=Math.floor(W*te.height);d===void 0&&(d=x(_e,xe));let ae=v?x(_e,xe):d;return ae.width=_e,ae.height=xe,ae.getContext("2d").drawImage(R,0,0,_e,xe),De("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+_e+"x"+xe+")."),ae}else return"data"in R&&De("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function g(R){return R.generateMipmaps}function y(R){s.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(R,v,X,W,te,_e=!1){if(R!==null){if(s[R]!==void 0)return s[R];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let xe;W&&(xe=e.get("EXT_texture_norm16"),xe||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=v;if(v===s.RED&&(X===s.FLOAT&&(ae=s.R32F),X===s.HALF_FLOAT&&(ae=s.R16F),X===s.UNSIGNED_BYTE&&(ae=s.R8),X===s.UNSIGNED_SHORT&&xe&&(ae=xe.R16_EXT),X===s.SHORT&&xe&&(ae=xe.R16_SNORM_EXT)),v===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(ae=s.R8UI),X===s.UNSIGNED_SHORT&&(ae=s.R16UI),X===s.UNSIGNED_INT&&(ae=s.R32UI),X===s.BYTE&&(ae=s.R8I),X===s.SHORT&&(ae=s.R16I),X===s.INT&&(ae=s.R32I)),v===s.RG&&(X===s.FLOAT&&(ae=s.RG32F),X===s.HALF_FLOAT&&(ae=s.RG16F),X===s.UNSIGNED_BYTE&&(ae=s.RG8),X===s.UNSIGNED_SHORT&&xe&&(ae=xe.RG16_EXT),X===s.SHORT&&xe&&(ae=xe.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(X===s.UNSIGNED_BYTE&&(ae=s.RG8UI),X===s.UNSIGNED_SHORT&&(ae=s.RG16UI),X===s.UNSIGNED_INT&&(ae=s.RG32UI),X===s.BYTE&&(ae=s.RG8I),X===s.SHORT&&(ae=s.RG16I),X===s.INT&&(ae=s.RG32I)),v===s.RGB_INTEGER&&(X===s.UNSIGNED_BYTE&&(ae=s.RGB8UI),X===s.UNSIGNED_SHORT&&(ae=s.RGB16UI),X===s.UNSIGNED_INT&&(ae=s.RGB32UI),X===s.BYTE&&(ae=s.RGB8I),X===s.SHORT&&(ae=s.RGB16I),X===s.INT&&(ae=s.RGB32I)),v===s.RGBA_INTEGER&&(X===s.UNSIGNED_BYTE&&(ae=s.RGBA8UI),X===s.UNSIGNED_SHORT&&(ae=s.RGBA16UI),X===s.UNSIGNED_INT&&(ae=s.RGBA32UI),X===s.BYTE&&(ae=s.RGBA8I),X===s.SHORT&&(ae=s.RGBA16I),X===s.INT&&(ae=s.RGBA32I)),v===s.RGB&&(X===s.UNSIGNED_SHORT&&xe&&(ae=xe.RGB16_EXT),X===s.SHORT&&xe&&(ae=xe.RGB16_SNORM_EXT),X===s.UNSIGNED_INT_5_9_9_9_REV&&(ae=s.RGB9_E5),X===s.UNSIGNED_INT_10F_11F_11F_REV&&(ae=s.R11F_G11F_B10F)),v===s.RGBA){let fe=_e?Qr:lt.getTransfer(te);X===s.FLOAT&&(ae=s.RGBA32F),X===s.HALF_FLOAT&&(ae=s.RGBA16F),X===s.UNSIGNED_BYTE&&(ae=fe===mt?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT&&xe&&(ae=xe.RGBA16_EXT),X===s.SHORT&&xe&&(ae=xe.RGBA16_SNORM_EXT),X===s.UNSIGNED_SHORT_4_4_4_4&&(ae=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(ae=s.RGB5_A1)}return(ae===s.R16F||ae===s.R32F||ae===s.RG16F||ae===s.RG32F||ae===s.RGBA16F||ae===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function w(R,v){let X;return R?v===null||v===Hn||v===_r?X=s.DEPTH24_STENCIL8:v===fn?X=s.DEPTH32F_STENCIL8:v===xr&&(X=s.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Hn||v===_r?X=s.DEPTH_COMPONENT24:v===fn?X=s.DEPTH_COMPONENT32F:v===xr&&(X=s.DEPTH_COMPONENT16),X}function E(R,v){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ft&&R.minFilter!==Ct?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function P(R){let v=R.target;v.removeEventListener("dispose",P),S(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function b(R){let v=R.target;v.removeEventListener("dispose",b),B(v)}function S(R){let v=n.get(R);if(v.__webglInit===void 0)return;let X=R.source,W=f.get(X);if(W){let te=W[v.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(R),Object.keys(W).length===0&&f.delete(X)}n.remove(R)}function I(R){let v=n.get(R);s.deleteTexture(v.__webglTexture);let X=R.source,W=f.get(X);delete W[v.__cacheKey],a.memory.textures--}function B(R){let v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let te=0;te<v.__webglFramebuffer[W].length;te++)s.deleteFramebuffer(v.__webglFramebuffer[W][te]);else s.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)s.deleteFramebuffer(v.__webglFramebuffer[W]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let X=R.textures;for(let W=0,te=X.length;W<te;W++){let _e=n.get(X[W]);_e.__webglTexture&&(s.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(X[W])}n.remove(R)}let G=0;function z(){G=0}function C(){return G}function N(R){G=R}function F(){let R=G;return R>=i.maxTextures&&De("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),G+=1,R}function V(R){let v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function se(R,v){let X=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&X.__version!==R.version){let W=R.image;if(W===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(X,R,v);return}}else R.isExternalTexture&&(X.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+v)}function J(R,v){let X=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){Y(X,R,v);return}else R.isExternalTexture&&(X.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+v)}function Z(R,v){let X=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){Y(X,R,v);return}t.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+v)}function k(R,v){let X=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&X.__version!==R.version){ne(X,R,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+v)}let H={[Yr]:s.REPEAT,[Sn]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},D={[Ft]:s.NEAREST,[Hu]:s.NEAREST_MIPMAP_NEAREST,[gr]:s.NEAREST_MIPMAP_LINEAR,[Ct]:s.LINEAR,[Oa]:s.LINEAR_MIPMAP_NEAREST,[xi]:s.LINEAR_MIPMAP_LINEAR},ee={[Qf]:s.NEVER,[sp]:s.ALWAYS,[ep]:s.LESS,[Mc]:s.LEQUAL,[tp]:s.EQUAL,[Sc]:s.GEQUAL,[np]:s.GREATER,[ip]:s.NOTEQUAL};function O(R,v){if(v.type===fn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ct||v.magFilter===Oa||v.magFilter===gr||v.magFilter===xi||v.minFilter===Ct||v.minFilter===Oa||v.minFilter===gr||v.minFilter===xi)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,H[v.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,H[v.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,H[v.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,D[v.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,D[v.minFilter]),v.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,ee[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ft||v.minFilter!==gr&&v.minFilter!==xi||v.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ce(R,v){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",P));let W=v.source,te=f.get(W);te===void 0&&(te={},f.set(W,te));let _e=V(v);if(_e!==R.__cacheKey){te[_e]===void 0&&(te[_e]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,X=!0),te[_e].usedTimes++;let xe=te[R.__cacheKey];xe!==void 0&&(te[R.__cacheKey].usedTimes--,xe.usedTimes===0&&I(v)),R.__cacheKey=_e,R.__webglTexture=te[_e].texture}return X}function q(R,v,X){return Math.floor(Math.floor(R/X)/v)}function $(R,v,X,W){let _e=R.updateRanges;if(_e.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,X,W,v.data);else{_e.sort((qe,Ee)=>qe.start-Ee.start);let xe=0;for(let qe=1;qe<_e.length;qe++){let Ee=_e[xe],Pe=_e[qe],$e=Ee.start+Ee.count,je=q(Pe.start,v.width,4),nt=q(Ee.start,v.width,4);Pe.start<=$e+1&&je===nt&&q(Pe.start+Pe.count-1,v.width,4)===je?Ee.count=Math.max(Ee.count,Pe.start+Pe.count-Ee.start):(++xe,_e[xe]=Pe)}_e.length=xe+1;let ae=t.getParameter(s.UNPACK_ROW_LENGTH),fe=t.getParameter(s.UNPACK_SKIP_PIXELS),Ce=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let qe=0,Ee=_e.length;qe<Ee;qe++){let Pe=_e[qe],$e=Math.floor(Pe.start/4),je=Math.ceil(Pe.count/4),nt=$e%v.width,j=Math.floor($e/v.width),Le=je,be=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(s.UNPACK_SKIP_ROWS,j),t.texSubImage2D(s.TEXTURE_2D,0,nt,j,Le,be,X,W,v.data)}R.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ae),t.pixelStorei(s.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ce)}}function Y(R,v,X){let W=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=s.TEXTURE_3D);let te=ce(R,v),_e=v.source;t.bindTexture(W,R.__webglTexture,s.TEXTURE0+X);let xe=n.get(_e);if(_e.version!==xe.__version||te===!0){if(t.activeTexture(s.TEXTURE0+X),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let be=lt.getPrimaries(lt.workingColorSpace),Ne=v.colorSpace===Ci?null:lt.getPrimaries(v.colorSpace),Oe=v.colorSpace===Ci||be===Ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe)}t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let fe=m(v.image,!1,i.maxTextureSize);fe=Te(v,fe);let Ce=r.convert(v.format,v.colorSpace),qe=r.convert(v.type),Ee=_(v.internalFormat,Ce,qe,v.normalized,v.colorSpace,v.isVideoTexture);O(W,v);let Pe,$e=v.mipmaps,je=v.isVideoTexture!==!0,nt=xe.__version===void 0||te===!0,j=_e.dataReady,Le=E(v,fe);if(v.isDepthTexture)Ee=w(v.format===Ki,v.type),nt&&(je?t.texStorage2D(s.TEXTURE_2D,1,Ee,fe.width,fe.height):t.texImage2D(s.TEXTURE_2D,0,Ee,fe.width,fe.height,0,Ce,qe,null));else if(v.isDataTexture)if($e.length>0){je&&nt&&t.texStorage2D(s.TEXTURE_2D,Le,Ee,$e[0].width,$e[0].height);for(let be=0,Ne=$e.length;be<Ne;be++)Pe=$e[be],je?j&&t.texSubImage2D(s.TEXTURE_2D,be,0,0,Pe.width,Pe.height,Ce,qe,Pe.data):t.texImage2D(s.TEXTURE_2D,be,Ee,Pe.width,Pe.height,0,Ce,qe,Pe.data);v.generateMipmaps=!1}else je?(nt&&t.texStorage2D(s.TEXTURE_2D,Le,Ee,fe.width,fe.height),j&&$(v,fe,Ce,qe)):t.texImage2D(s.TEXTURE_2D,0,Ee,fe.width,fe.height,0,Ce,qe,fe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){je&&nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Le,Ee,$e[0].width,$e[0].height,fe.depth);for(let be=0,Ne=$e.length;be<Ne;be++)if(Pe=$e[be],v.format!==pn)if(Ce!==null)if(je){if(j)if(v.layerUpdates.size>0){let Oe=ju(Pe.width,Pe.height,v.format,v.type);for(let Se of v.layerUpdates){let He=Pe.data.subarray(Se*Oe/Pe.data.BYTES_PER_ELEMENT,(Se+1)*Oe/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,Se,Pe.width,Pe.height,1,Ce,He)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,0,Pe.width,Pe.height,fe.depth,Ce,Pe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,be,Ee,Pe.width,Pe.height,fe.depth,0,Pe.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?j&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,be,0,0,0,Pe.width,Pe.height,fe.depth,Ce,qe,Pe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,be,Ee,Pe.width,Pe.height,fe.depth,0,Ce,qe,Pe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{je&&nt&&t.texStorage2D(s.TEXTURE_2D,Le,Ee,$e[0].width,$e[0].height);for(let be=0,Ne=$e.length;be<Ne;be++)Pe=$e[be],v.format!==pn?Ce!==null?je?j&&t.compressedTexSubImage2D(s.TEXTURE_2D,be,0,0,Pe.width,Pe.height,Ce,Pe.data):t.compressedTexImage2D(s.TEXTURE_2D,be,Ee,Pe.width,Pe.height,0,Pe.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?j&&t.texSubImage2D(s.TEXTURE_2D,be,0,0,Pe.width,Pe.height,Ce,qe,Pe.data):t.texImage2D(s.TEXTURE_2D,be,Ee,Pe.width,Pe.height,0,Ce,qe,Pe.data)}else if(v.isDataArrayTexture)if(je){if(nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Le,Ee,fe.width,fe.height,fe.depth),j)if(v.layerUpdates.size>0){let be=ju(fe.width,fe.height,v.format,v.type);for(let Ne of v.layerUpdates){let Oe=fe.data.subarray(Ne*be/fe.data.BYTES_PER_ELEMENT,(Ne+1)*be/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ne,fe.width,fe.height,1,Ce,qe,Oe)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ce,qe,fe.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ee,fe.width,fe.height,fe.depth,0,Ce,qe,fe.data);else if(v.isData3DTexture)je?(nt&&t.texStorage3D(s.TEXTURE_3D,Le,Ee,fe.width,fe.height,fe.depth),j&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ce,qe,fe.data)):t.texImage3D(s.TEXTURE_3D,0,Ee,fe.width,fe.height,fe.depth,0,Ce,qe,fe.data);else if(v.isFramebufferTexture){if(nt)if(je)t.texStorage2D(s.TEXTURE_2D,Le,Ee,fe.width,fe.height);else{let be=fe.width,Ne=fe.height;for(let Oe=0;Oe<Le;Oe++)t.texImage2D(s.TEXTURE_2D,Oe,Ee,be,Ne,0,Ce,qe,null),be>>=1,Ne>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){let be=s.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),fe.parentNode!==be){be.appendChild(fe),u.add(v),be.onpaint=Ne=>{let Oe=Ne.changedElements;for(let Se of u)Oe.includes(Se.image)&&(Se.needsUpdate=!0)},be.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,fe);else{let Oe=s.RGBA,Se=s.RGBA,He=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Oe,Se,He,fe)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if($e.length>0){if(je&&nt){let be=ye($e[0]);t.texStorage2D(s.TEXTURE_2D,Le,Ee,be.width,be.height)}for(let be=0,Ne=$e.length;be<Ne;be++)Pe=$e[be],je?j&&t.texSubImage2D(s.TEXTURE_2D,be,0,0,Ce,qe,Pe):t.texImage2D(s.TEXTURE_2D,be,Ee,Ce,qe,Pe);v.generateMipmaps=!1}else if(je){if(nt){let be=ye(fe);t.texStorage2D(s.TEXTURE_2D,Le,Ee,be.width,be.height)}j&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ce,qe,fe)}else t.texImage2D(s.TEXTURE_2D,0,Ee,Ce,qe,fe);g(v)&&y(W),xe.__version=_e.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function ne(R,v,X){if(v.image.length!==6)return;let W=ce(R,v),te=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+X);let _e=n.get(te);if(te.version!==_e.__version||W===!0){t.activeTexture(s.TEXTURE0+X);let xe=lt.getPrimaries(lt.workingColorSpace),ae=v.colorSpace===Ci?null:lt.getPrimaries(v.colorSpace),fe=v.colorSpace===Ci||xe===ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let Ce=v.isCompressedTexture||v.image[0].isCompressedTexture,qe=v.image[0]&&v.image[0].isDataTexture,Ee=[];for(let Se=0;Se<6;Se++)!Ce&&!qe?Ee[Se]=m(v.image[Se],!0,i.maxCubemapSize):Ee[Se]=qe?v.image[Se].image:v.image[Se],Ee[Se]=Te(v,Ee[Se]);let Pe=Ee[0],$e=r.convert(v.format,v.colorSpace),je=r.convert(v.type),nt=_(v.internalFormat,$e,je,v.normalized,v.colorSpace),j=v.isVideoTexture!==!0,Le=_e.__version===void 0||W===!0,be=te.dataReady,Ne=E(v,Pe);O(s.TEXTURE_CUBE_MAP,v);let Oe;if(Ce){j&&Le&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,nt,Pe.width,Pe.height);for(let Se=0;Se<6;Se++){Oe=Ee[Se].mipmaps;for(let He=0;He<Oe.length;He++){let Ge=Oe[He];v.format!==pn?$e!==null?j?be&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He,0,0,Ge.width,Ge.height,$e,Ge.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He,nt,Ge.width,Ge.height,0,Ge.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?be&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He,0,0,Ge.width,Ge.height,$e,je,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He,nt,Ge.width,Ge.height,0,$e,je,Ge.data)}}}else{if(Oe=v.mipmaps,j&&Le){Oe.length>0&&Ne++;let Se=ye(Ee[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,nt,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(qe){j?be&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Ee[Se].width,Ee[Se].height,$e,je,Ee[Se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,nt,Ee[Se].width,Ee[Se].height,0,$e,je,Ee[Se].data);for(let He=0;He<Oe.length;He++){let gt=Oe[He].image[Se].image;j?be&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He+1,0,0,gt.width,gt.height,$e,je,gt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He+1,nt,gt.width,gt.height,0,$e,je,gt.data)}}else{j?be&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,$e,je,Ee[Se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,nt,$e,je,Ee[Se]);for(let He=0;He<Oe.length;He++){let Ge=Oe[He];j?be&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He+1,0,0,$e,je,Ge.image[Se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Se,He+1,nt,$e,je,Ge.image[Se])}}}g(v)&&y(s.TEXTURE_CUBE_MAP),_e.__version=te.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function le(R,v,X,W,te,_e){let xe=r.convert(X.format,X.colorSpace),ae=r.convert(X.type),fe=_(X.internalFormat,xe,ae,X.normalized,X.colorSpace),Ce=n.get(v),qe=n.get(X);if(qe.__renderTarget=v,!Ce.__hasExternalTextures){let Ee=Math.max(1,v.width>>_e),Pe=Math.max(1,v.height>>_e);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,_e,fe,Ee,Pe,v.depth,0,xe,ae,null):t.texImage2D(te,_e,fe,Ee,Pe,0,xe,ae,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),Q(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,W,te,qe.__webglTexture,0,Re(v)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,W,te,qe.__webglTexture,_e),t.bindFramebuffer(s.FRAMEBUFFER,null)}function he(R,v,X){if(s.bindRenderbuffer(s.RENDERBUFFER,R),v.depthBuffer){let W=v.depthTexture,te=W&&W.isDepthTexture?W.type:null,_e=w(v.stencilBuffer,te),xe=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Q(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re(v),_e,v.width,v.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re(v),_e,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,_e,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xe,s.RENDERBUFFER,R)}else{let W=v.textures;for(let te=0;te<W.length;te++){let _e=W[te],xe=r.convert(_e.format,_e.colorSpace),ae=r.convert(_e.type),fe=_(_e.internalFormat,xe,ae,_e.normalized,_e.colorSpace);Q(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re(v),fe,v.width,v.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re(v),fe,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,fe,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ae(R,v,X){let W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(v.depthTexture);if(te.__renderTarget=v,(!te.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(te.__webglInit===void 0&&(te.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture),O(s.TEXTURE_CUBE_MAP,v.depthTexture);let Ce=r.convert(v.depthTexture.format),qe=r.convert(v.depthTexture.type),Ee;v.depthTexture.format===hi?Ee=s.DEPTH_COMPONENT24:v.depthTexture.format===Ki&&(Ee=s.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Ee,v.width,v.height,0,Ce,qe,null)}}else se(v.depthTexture,0);let _e=te.__webglTexture,xe=Re(v),ae=W?s.TEXTURE_CUBE_MAP_POSITIVE_X+X:s.TEXTURE_2D,fe=v.depthTexture.format===Ki?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===hi)Q(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,ae,_e,0,xe):s.framebufferTexture2D(s.FRAMEBUFFER,fe,ae,_e,0);else if(v.depthTexture.format===Ki)Q(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,fe,ae,_e,0,xe):s.framebufferTexture2D(s.FRAMEBUFFER,fe,ae,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(R){let v=n.get(R),X=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){let W=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){let te=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",te)};W.addEventListener("dispose",te),v.__depthDisposeCallback=te}v.__boundDepthTexture=W}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(X)for(let W=0;W<6;W++)Ae(v.__webglFramebuffer[W],R,W);else{let W=R.texture.mipmaps;W&&W.length>0?Ae(v.__webglFramebuffer[0],R,0):Ae(v.__webglFramebuffer,R,0)}else if(X){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=s.createRenderbuffer(),he(v.__webglDepthbuffer[W],R,!1);else{let te=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_e=v.__webglDepthbuffer[W];s.bindRenderbuffer(s.RENDERBUFFER,_e),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,_e)}}else{let W=R.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),he(v.__webglDepthbuffer,R,!1);else{let te=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_e=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,_e),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,_e)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ie(R,v,X){let W=n.get(R);v!==void 0&&le(W.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&re(R)}function pe(R){let v=R.texture,X=n.get(R),W=n.get(v);R.addEventListener("dispose",b);let te=R.textures,_e=R.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(W.__webglTexture===void 0&&(W.__webglTexture=s.createTexture()),W.__version=v.version,a.memory.textures++),_e){X.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer[ae]=[];for(let fe=0;fe<v.mipmaps.length;fe++)X.__webglFramebuffer[ae][fe]=s.createFramebuffer()}else X.__webglFramebuffer[ae]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)X.__webglFramebuffer[ae]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(xe)for(let ae=0,fe=te.length;ae<fe;ae++){let Ce=n.get(te[ae]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&Q(R)===!1){X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ae=0;ae<te.length;ae++){let fe=te[ae];X.__webglColorRenderbuffer[ae]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[ae]);let Ce=r.convert(fe.format,fe.colorSpace),qe=r.convert(fe.type),Ee=_(fe.internalFormat,Ce,qe,fe.normalized,fe.colorSpace,R.isXRRenderTarget===!0),Pe=Re(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pe,Ee,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,X.__webglColorRenderbuffer[ae])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),he(X.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(_e){t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),O(s.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)le(X.__webglFramebuffer[ae][fe],R,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else le(X.__webglFramebuffer[ae],R,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(v)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ae=0,fe=te.length;ae<fe;ae++){let Ce=te[ae],qe=n.get(Ce),Ee=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Ee=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ee,qe.__webglTexture),O(Ee,Ce),le(X.__webglFramebuffer,R,Ce,s.COLOR_ATTACHMENT0+ae,Ee,0),g(Ce)&&y(Ee)}t.unbindTexture()}else{let ae=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ae,W.__webglTexture),O(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)le(X.__webglFramebuffer[fe],R,v,s.COLOR_ATTACHMENT0,ae,fe);else le(X.__webglFramebuffer,R,v,s.COLOR_ATTACHMENT0,ae,0);g(v)&&y(ae),t.unbindTexture()}R.depthBuffer&&re(R)}function ve(R){let v=R.textures;for(let X=0,W=v.length;X<W;X++){let te=v[X];if(g(te)){let _e=M(R),xe=n.get(te).__webglTexture;t.bindTexture(_e,xe),y(_e),t.unbindTexture()}}}let we=[],ke=[];function Ue(R){if(R.samples>0){if(Q(R)===!1){let v=R.textures,X=R.width,W=R.height,te=s.COLOR_BUFFER_BIT,_e=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=n.get(R),ae=v.length>1;if(ae)for(let Ce=0;Ce<v.length;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);let fe=R.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ce=0;Ce<v.length;Ce++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ae){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Ce]);let qe=n.get(v[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,qe,0)}s.blitFramebuffer(0,0,X,W,0,0,X,W,te,s.NEAREST),l===!0&&(we.length=0,ke.length=0,we.push(s.COLOR_ATTACHMENT0+Ce),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(we.push(_e),ke.push(_e),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ke)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ae)for(let Ce=0;Ce<v.length;Ce++){t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Ce]);let qe=n.get(v[Ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,qe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let v=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Re(R){return Math.min(i.maxSamples,R.samples)}function Q(R){let v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(R){let v=a.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function Te(R,v){let X=R.colorSpace,W=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||X!==jr&&X!==Ci&&(lt.getTransfer(X)===mt?(W!==pn||te!==Tn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",X)),v}function ye(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.getTextureUnits=C,this.setTextureUnits=N,this.setTexture2D=se,this.setTexture2DArray=J,this.setTexture3D=Z,this.setTextureCube=k,this.rebindTextures=ie,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Q,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tx(s,e){function t(n,i=Ci){let r,a=lt.getTransfer(i);if(n===Tn)return s.UNSIGNED_BYTE;if(n===Vl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===kl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===qu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$u)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wu)return s.BYTE;if(n===Xu)return s.SHORT;if(n===xr)return s.UNSIGNED_SHORT;if(n===zl)return s.INT;if(n===Hn)return s.UNSIGNED_INT;if(n===fn)return s.FLOAT;if(n===Qn)return s.HALF_FLOAT;if(n===Yu)return s.ALPHA;if(n===Zu)return s.RGB;if(n===pn)return s.RGBA;if(n===hi)return s.DEPTH_COMPONENT;if(n===Ki)return s.DEPTH_STENCIL;if(n===Gl)return s.RED;if(n===Ba)return s.RED_INTEGER;if(n===ji)return s.RG;if(n===Hl)return s.RG_INTEGER;if(n===Wl)return s.RGBA_INTEGER;if(n===za||n===Va||n===ka||n===Ga)if(a===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ka)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xl||n===ql||n===$l||n===Yl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ql)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$l)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zl||n===Jl||n===Kl||n===jl||n===Ql||n===Ha||n===ec)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Zl||n===Jl)return a===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kl)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===jl)return r.COMPRESSED_R11_EAC;if(n===Ql)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ha)return r.COMPRESSED_RG11_EAC;if(n===ec)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===tc||n===nc||n===ic||n===sc||n===rc||n===ac||n===oc||n===lc||n===cc||n===hc||n===uc||n===dc||n===fc||n===pc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===tc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ic)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===rc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ac)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===lc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===cc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===dc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pc)return a===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===mc||n===gc||n===xc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===mc)return a===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_c||n===yc||n===Wa||n===vc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_c)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var F1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new la(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new tn({vertexShader:F1,fragmentShader:O1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new ir(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ip=class extends Un{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,x=typeof XRWebGLBinding<"u",m=new Pp,g={},y=t.getContextAttributes(),M=null,_=null,w=[],E=[],P=new Me,b=null,S=null,I=new Nt;I.viewport=new ut;let B=new Nt;B.viewport=new ut;let G=[I,B],z=new Ll,C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let $=w[q];return $===void 0&&($=new Js,w[q]=$),$.getTargetRaySpace()},this.getControllerGrip=function(q){let $=w[q];return $===void 0&&($=new Js,w[q]=$),$.getGripSpace()},this.getHand=function(q){let $=w[q];return $===void 0&&($=new Js,w[q]=$),$.getHandSpace()};function F(q){let $=E.indexOf(q.inputSource);if($===-1)return;let Y=w[$];Y!==void 0&&(Y.update(q.inputSource,q.frame,c||a),Y.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",se);for(let q=0;q<w.length;q++){let $=E[q];$!==null&&(E[q]=null,w[q].disconnect($))}C=null,N=null,m.reset();for(let q in g)delete g[q];if(e.setRenderTarget(M),f=null,d=null,u=null,i=null,_=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(P.width,P.height,!1),S!==null){let q=S.camera;q.fov=S.fov,q.zoom=S.zoom,q.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",V),i.addEventListener("inputsourceschange",se),y.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Y=null,ne=null,le=null;y.depth&&(le=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=y.stencil?Ki:hi,ne=y.stencil?_r:Hn);let he={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(he),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new en(d.textureWidth,d.textureHeight,{format:pn,type:Tn,depthTexture:new Hi(d.textureWidth,d.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Y={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Y),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new en(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ce.setContext(i),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(q){for(let $=0;$<q.removed.length;$++){let Y=q.removed[$],ne=E.indexOf(Y);ne>=0&&(E[ne]=null,w[ne].disconnect(Y))}for(let $=0;$<q.added.length;$++){let Y=q.added[$],ne=E.indexOf(Y);if(ne===-1){for(let he=0;he<w.length;he++)if(he>=E.length){E.push(Y),ne=he;break}else if(E[he]===null){E[he]=Y,ne=he;break}if(ne===-1)break}let le=w[ne];le&&le.connect(Y)}}let J=new L,Z=new L;function k(q,$,Y){J.setFromMatrixPosition($.matrixWorld),Z.setFromMatrixPosition(Y.matrixWorld);let ne=J.distanceTo(Z),le=$.projectionMatrix.elements,he=Y.projectionMatrix.elements,Ae=le[14]/(le[10]-1),re=le[14]/(le[10]+1),ie=(le[9]+1)/le[5],pe=(le[9]-1)/le[5],ve=(le[8]-1)/le[0],we=(he[8]+1)/he[0],ke=Ae*ve,Ue=Ae*we,Re=ne/(-ve+we),Q=Re*-ve;if($.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Q),q.translateZ(Re),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),le[10]===-1)q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let U=Ae+Re,Te=re+Re,ye=ke-Q,R=Ue+(ne-Q),v=ie*re/Te*U,X=pe*re/Te*U;q.projectionMatrix.makePerspective(ye,R,v,X,U,Te),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function H(q,$){$===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices($.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let $=q.near,Y=q.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(Y=m.depthFar)),z.near=B.near=I.near=$,z.far=B.far=I.far=Y,(C!==z.near||N!==z.far)&&(i.updateRenderState({depthNear:z.near,depthFar:z.far}),C=z.near,N=z.far),z.layers.mask=q.layers.mask|6,I.layers.mask=z.layers.mask&-5,B.layers.mask=z.layers.mask&-3;let ne=q.parent,le=z.cameras;H(z,ne);for(let he=0;he<le.length;he++)H(le[he],ne);le.length===2?k(z,I,B):z.projectionMatrix.copy(I.projectionMatrix),S===null&&q.isPerspectiveCamera&&(S={camera:q,fov:q.fov,zoom:q.zoom}),D(q,z,ne)};function D(q,$,Y){Y===null?q.matrix.copy($.matrixWorld):(q.matrix.copy(Y.matrixWorld),q.matrix.invert(),q.matrix.multiply($.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=qs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(q){return g[q]};let ee=null;function O(q,$){if(h=$.getViewerPose(c||a),p=$,h!==null){let Y=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let ne=!1;Y.length!==z.cameras.length&&(z.cameras.length=0,ne=!0);for(let re=0;re<Y.length;re++){let ie=Y[re],pe=null;if(f!==null)pe=f.getViewport(ie);else{let we=u.getViewSubImage(d,ie);pe=we.viewport,re===0&&(e.setRenderTargetTextures(_,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(_))}let ve=G[re];ve===void 0&&(ve=new Nt,ve.layers.enable(re),ve.viewport=new ut,G[re]=ve),ve.matrix.fromArray(ie.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(ie.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(pe.x,pe.y,pe.width,pe.height),re===0&&(z.matrix.copy(ve.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ne===!0&&z.cameras.push(ve)}let le=i.enabledFeatures;if(le&&le.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let re=u.getDepthInformation(Y[0]);re&&re.isValid&&re.texture&&m.init(re,i.renderState)}if(le&&le.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let re=0;re<Y.length;re++){let ie=Y[re].camera;if(ie){let pe=g[ie];pe||(pe=new la,g[ie]=pe);let ve=u.getCameraImage(ie);pe.sourceTexture=ve}}}}for(let Y=0;Y<w.length;Y++){let ne=E[Y],le=w[Y];ne!==null&&le!==void 0&&le.update(ne,$,c||a)}ee&&ee(q,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),p=null}let ce=new Z0;ce.setAnimationLoop(O),this.setAnimationLoop=function(q){ee=q},this.dispose=function(){}}},B1=new Qe,nx=new tt;nx.set(-1,0,0,0,1,0,0,0,1);function z1(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,lp(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,y,M,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,y,M):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===gn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===gn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let y=e.get(g),M=y.envMap,_=y.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(B1.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nx),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=M*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function V1(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,w){let E=w.program;n.uniformBlockBinding(_,E)}function c(_,w){let E=i[_.id];E===void 0&&(m(_),E=h(_),i[_.id]=E,_.addEventListener("dispose",y));let P=w.program;n.updateUBOMapping(_,P);let b=e.render.frame;r[_.id]!==b&&(d(_),r[_.id]=b)}function h(_){let w=u();_.__bindingPointIndex=w;let E=s.createBuffer(),P=_.__size,b=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,P,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,E),E}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let w=i[_.id],E=_.uniforms,P=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let b=0,S=E.length;b<S;b++){let I=E[b];if(Array.isArray(I))for(let B=0,G=I.length;B<G;B++)f(I[B],b,B,P);else f(I,b,0,P)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,w,E,P){if(x(_,w,E,P)===!0){let b=_.__offset,S=_.value;if(Array.isArray(S)){let I=0;for(let B=0;B<S.length;B++){let G=S[B],z=g(G);p(G,_.__data,I),typeof G!="number"&&typeof G!="boolean"&&!G.isMatrix3&&!ArrayBuffer.isView(G)&&(I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(S,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,b,_.__data)}}function p(_,w,E){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,E)}function x(_,w,E,P){let b=_.value,S=w+"_"+E;if(P[S]===void 0)return typeof b=="number"||typeof b=="boolean"?P[S]=b:ArrayBuffer.isView(b)?P[S]=b.slice():P[S]=b.clone(),!0;{let I=P[S];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return P[S]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(I.equals(b)===!1)return I.copy(b),!0}}return!1}function m(_){let w=_.uniforms,E=0,P=16;for(let S=0,I=w.length;S<I;S++){let B=Array.isArray(w[S])?w[S]:[w[S]];for(let G=0,z=B.length;G<z;G++){let C=B[G],N=Array.isArray(C.value)?C.value:[C.value];for(let F=0,V=N.length;F<V;F++){let se=N[F],J=g(se),Z=E%P,k=Z%J.boundary,H=Z+k;E+=k,H!==0&&P-H<J.storage&&(E+=P-H),C.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=E,E+=J.storage}}}let b=E%P;return b>0&&(E+=P-b),_.__size=E,_.__cache={},this}function g(_){let w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):De("WebGLRenderer: Unsupported uniform value type.",_),w}function y(_){let w=_.target;w.removeEventListener("dispose",y);let E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function M(){for(let _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:c,dispose:M}}var k1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ri=null;function G1(){return Ri===null&&(Ri=new wn(k1,16,16,ji,Qn),Ri.name="DFG_LUT",Ri.minFilter=Ct,Ri.magFilter=Ct,Ri.wrapS=Sn,Ri.wrapT=Sn,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}var Pc=class{constructor(e={}){let{canvas:t=rp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Tn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let x=f,m=new Set([Wl,Hl,Ba]),g=new Set([Tn,Hn,xr,_r,Vl,kl]),y=new Uint32Array(4),M=new Int32Array(4),_=new L,w=null,E=null,P=[],b=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,B=!1,G=null,z=null,C=null,N=null;this._outputColorSpace=Qt;let F=0,V=0,se=null,J=-1,Z=null,k=new ut,H=new ut,D=null,ee=new ze(0),O=0,ce=t.width,q=t.height,$=1,Y=null,ne=null,le=new ut(0,0,ce,q),he=new ut(0,0,ce,q),Ae=!1,re=new wi,ie=!1,pe=!1,ve=new Qe,we=new L,ke=new ut,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Re=!1;function Q(){return se===null?$:1}let U=n;function Te(A,K){return t.getContext(A,K)}let ye,R,v,X,W,te,_e,xe,ae,fe,Ce,qe,Ee,Pe,$e,je,nt,j,Le,be,Ne,Oe,Se;try{let A={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",ni,!1),U===null){let K="webgl2";if(U=Te(K,A),U===null)throw Te(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(A){throw t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",ni,!1),Je("WebGLRenderer: "+A.message),A}function He(){ye=new JM(U),ye.init(),Ne=new tx(U,ye),R=new VM(U,ye,e,Ne),v=new U1(U,ye),R.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),z=U.createFramebuffer(),C=U.createFramebuffer(),N=U.createFramebuffer(),X=new QM(U),W=new v1,te=new N1(U,ye,v,W,R,Ne,X),_e=new ZM(I),xe=new tv(U),Oe=new BM(U,xe),ae=new KM(U,xe,X,Oe),fe=new tS(U,ae,xe,Oe,X),j=new eS(U,R,te),$e=new kM(W),Ce=new y1(I,_e,ye,R,Oe,$e),qe=new z1(I,W),Ee=new M1,Pe=new C1(ye),nt=new OM(I,_e,v,fe,p,l),je=new D1(I,fe,R),Se=new V1(U,X,R,v),Le=new zM(U,ye,X),be=new jM(U,ye,X),X.programs=Ce.programs,I.capabilities=R,I.extensions=ye,I.properties=W,I.renderLists=Ee,I.shadowMap=je,I.state=v,I.info=X}x!==Tn&&(S=new iS(x,t.width,t.height,o,i,r));let Ge=new Ip(I,U);this.xr=Ge,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=ye.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=ye.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(ce,q,!1))},this.getSize=function(A){return A.set(ce,q)},this.setSize=function(A,K,me=!0){if(Ge.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}ce=A,q=K,t.width=Math.floor(A*$),t.height=Math.floor(K*$),me===!0&&(t.style.width=A+"px",t.style.height=K+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,A,K)},this.getDrawingBufferSize=function(A){return A.set(ce*$,q*$).floor()},this.setDrawingBufferSize=function(A,K,me){ce=A,q=K,$=me,t.width=Math.floor(A*me),t.height=Math.floor(K*me),this.setViewport(0,0,A,K)},this.setEffects=function(A){if(x===Tn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let K=0;K<A.length;K++)if(A[K].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(k)},this.getViewport=function(A){return A.copy(le)},this.setViewport=function(A,K,me,ue){A.isVector4?le.set(A.x,A.y,A.z,A.w):le.set(A,K,me,ue),v.viewport(k.copy(le).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(he)},this.setScissor=function(A,K,me,ue){A.isVector4?he.set(A.x,A.y,A.z,A.w):he.set(A,K,me,ue),v.scissor(H.copy(he).multiplyScalar($).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(A){v.setScissorTest(Ae=A)},this.setOpaqueSort=function(A){Y=A},this.setTransparentSort=function(A){ne=A},this.getClearColor=function(A){return A.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(A=!0,K=!0,me=!0){let ue=0;if(A){let de=!1;if(se!==null){let Be=se.texture.format;de=m.has(Be)}if(de){let Be=se.texture.type,Xe=g.has(Be),Fe=nt.getClearColor(),Ye=nt.getClearAlpha(),Ke=Fe.r,at=Fe.g,ct=Fe.b;Xe?(y[0]=Ke,y[1]=at,y[2]=ct,y[3]=Ye,U.clearBufferuiv(U.COLOR,0,y)):(M[0]=Ke,M[1]=at,M[2]=ct,M[3]=Ye,U.clearBufferiv(U.COLOR,0,M))}else ue|=U.COLOR_BUFFER_BIT}K&&(ue|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),me&&(ue|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ue!==0&&U.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),G=A},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",ni,!1),nt.dispose(),Ee.dispose(),Pe.dispose(),W.dispose(),_e.dispose(),fe.dispose(),Oe.dispose(),Se.dispose(),Ce.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",jp),Ge.removeEventListener("sessionend",Qp),Is.stop()};function gt(A){A.preventDefault(),ta("WebGLRenderer: Context Lost."),B=!0}function xt(){ta("WebGLRenderer: Context Restored."),B=!1;let A=X.autoReset,K=je.enabled,me=je.autoUpdate,ue=je.needsUpdate,de=je.type;He(),X.autoReset=A,je.enabled=K,je.autoUpdate=me,je.needsUpdate=ue,je.type=de}function ni(A){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function yi(A){let K=A.target;K.removeEventListener("dispose",yi),Jx(K)}function Jx(A){Kx(A),W.remove(A)}function Kx(A){let K=W.get(A).programs;K!==void 0&&(K.forEach(function(me){Ce.releaseProgram(me)}),A.isShaderMaterial&&Ce.releaseShaderCache(A))}this.renderBufferDirect=function(A,K,me,ue,de,Be){K===null&&(K=Ue);let Xe=de.isMesh&&de.matrixWorld.determinantAffine()<0,Fe=e_(A,K,me,ue,de);v.setMaterial(ue,Xe);let Ye=me.index,Ke=1;if(ue.wireframe===!0){if(Ye=ae.getWireframeAttribute(me),Ye===void 0)return;Ke=2}let at=me.drawRange,ct=me.attributes.position,Ze=at.start*Ke,_t=(at.start+at.count)*Ke;Be!==null&&(Ze=Math.max(Ze,Be.start*Ke),_t=Math.min(_t,(Be.start+Be.count)*Ke)),Ye!==null?(Ze=Math.max(Ze,0),_t=Math.min(_t,Ye.count)):ct!=null&&(Ze=Math.max(Ze,0),_t=Math.min(_t,ct.count));let Ht=_t-Ze;if(Ht<0||Ht===1/0)return;Oe.setup(de,ue,Fe,me,Ye);let Rt,wt=Le;if(Ye!==null&&(Rt=xe.get(Ye),wt=be,wt.setIndex(Rt)),de.isMesh)ue.wireframe===!0?(v.setLineWidth(ue.wireframeLinewidth*Q()),wt.setMode(U.LINES)):wt.setMode(U.TRIANGLES);else if(de.isLine){let on=ue.linewidth;on===void 0&&(on=1),v.setLineWidth(on*Q()),de.isLineSegments?wt.setMode(U.LINES):de.isLineLoop?wt.setMode(U.LINE_LOOP):wt.setMode(U.LINE_STRIP)}else de.isPoints?wt.setMode(U.POINTS):de.isSprite&&wt.setMode(U.TRIANGLES);if(de.isBatchedMesh)if(ye.get("WEBGL_multi_draw"))wt.renderMultiDraw(de._multiDrawStarts,de._multiDrawCounts,de._multiDrawCount);else{let on=de._multiDrawStarts,We=de._multiDrawCounts,yn=de._multiDrawCount,ft=Ye?xe.get(Ye).bytesPerElement:1,Xn=W.get(ue).currentProgram.getUniforms();for(let vi=0;vi<yn;vi++)Xn.setValue(U,"_gl_DrawID",vi),wt.render(on[vi]/ft,We[vi])}else if(de.isInstancedMesh)wt.renderInstances(Ze,Ht,de.count);else if(me.isInstancedBufferGeometry){let on=me._maxInstanceCount!==void 0?me._maxInstanceCount:1/0,We=Math.min(me.instanceCount,on);wt.renderInstances(Ze,Ht,We)}else wt.render(Ze,Ht)};function Kp(A,K,me,ue){G!==null&&A.isNodeMaterial&&G.setObject(ue,A),ie===!0&&$e.setState(A,me,!1),A.transparent===!0&&A.side===pi&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,Oc(A,K,ue),A.side=Zi,A.needsUpdate=!0,Oc(A,K,ue),A.side=pi):Oc(A,K,ue)}this.compile=function(A,K,me=null){me===null&&(me=A),G!==null&&G.renderStart(A,K,me),E=Pe.get(me),E.init(K),b.push(E),me.traverseVisible(function(de){de.isLight&&de.layers.test(K.layers)&&(E.pushLight(de),de.castShadow&&E.pushShadow(de))}),A!==me&&A.traverseVisible(function(de){de.isLight&&de.layers.test(K.layers)&&(E.pushLight(de),de.castShadow&&E.pushShadow(de))}),E.setupLights(),G!==null&&G.updateLights(E.state.lightsArray),pe=this.localClippingEnabled,ie=$e.init(this.clippingPlanes,pe),ie===!0&&$e.setGlobalState(this.clippingPlanes,K),G!==null&&je.render(E.state.shadowsArray,me,K);let ue=new Set;return A.traverse(function(de){if(!(de.isMesh||de.isPoints||de.isLine||de.isSprite))return;let Be=de.material;if(Be)if(Array.isArray(Be))for(let Xe=0;Xe<Be.length;Xe++){let Fe=Be[Xe];Kp(Fe,me,K,de),ue.add(Fe)}else Kp(Be,me,K,de),ue.add(Be)}),E=b.pop(),G!==null&&G.renderEnd(),ue},this.compileAsync=function(A,K,me=null){let ue=this.compile(A,K,me);return new Promise(de=>{function Be(){if(ue.forEach(function(Xe){let Ye=W.get(Xe).currentProgram;(Ye===void 0||Ye.isReady())&&ue.delete(Xe)}),ue.size===0){de(A);return}setTimeout(Be,10)}ye.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let wd=null;function jx(A){wd&&wd(A)}function jp(){Is.stop()}function Qp(){Is.start()}let Is=new Z0;Is.setAnimationLoop(jx),typeof self<"u"&&Is.setContext(self),this.setAnimationLoop=function(A){wd=A,Ge.setAnimationLoop(A),A===null?Is.stop():Is.start()},Ge.addEventListener("sessionstart",jp),Ge.addEventListener("sessionend",Qp),this.render=function(A,K){if(K!==void 0&&K.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;G!==null&&G.renderStart(A,K);let me=Ge.enabled===!0&&Ge.isPresenting===!0,ue=S!==null&&(se===null||me)&&S.begin(I,se);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(K),K=Ge.getCamera()),A.isScene===!0&&A.onBeforeRender(I,A,K,se),E=Pe.get(A,b.length),E.init(K),E.state.textureUnits=te.getTextureUnits(),b.push(E),ve.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),re.setFromProjectionMatrix(ve,Dn,K.reversedDepth),pe=this.localClippingEnabled,ie=$e.init(this.clippingPlanes,pe),w=Ee.get(A,P.length),w.init(),P.push(w),Ge.enabled===!0&&Ge.isPresenting===!0){let Xe=I.xr.getDepthSensingMesh();Xe!==null&&Ed(Xe,K,-1/0,I.sortObjects)}Ed(A,K,0,I.sortObjects),w.finish(),G!==null&&G.updateLights(E.state.lightsArray),I.sortObjects===!0&&w.sort(Y,ne),Re=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,Re&&nt.addToRenderList(w,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ie===!0&&$e.beginShadows();let de=E.state.shadowsArray;if(je.render(de,A,K),ie===!0&&$e.endShadows(),(ue&&S.hasRenderPass())===!1){let Xe=w.opaque,Fe=w.transmissive;if(E.setupLights(),K.isArrayCamera){let Ye=K.cameras;if(Fe.length>0)for(let Ke=0,at=Ye.length;Ke<at;Ke++){let ct=Ye[Ke];tm(Xe,Fe,A,ct)}Re&&nt.render(A);for(let Ke=0,at=Ye.length;Ke<at;Ke++){let ct=Ye[Ke];em(w,A,ct,ct.viewport)}}else Fe.length>0&&tm(Xe,Fe,A,K),Re&&nt.render(A),em(w,A,K)}se!==null&&V===0&&(te.updateMultisampleRenderTarget(se),te.updateRenderTargetMipmap(se)),ue&&S.end(I),A.isScene===!0&&A.onAfterRender(I,A,K),Oe.resetDefaultState(),J=-1,Z=null,b.pop(),b.length>0?(E=b[b.length-1],te.setTextureUnits(E.state.textureUnits),ie===!0&&$e.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,G!==null&&G.renderEnd()};function Ed(A,K,me,ue){if(A.visible===!1)return;if(A.layers.test(K.layers)){if(A.isGroup)me=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(K);else if(A.isLightProbeGrid)E.pushLightProbeGrid(A);else if(A.isLight)E.pushLight(A),A.castShadow&&E.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(re)){ue&&ke.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ve);let Xe=fe.update(A),Fe=A.material;Fe.visible&&w.push(A,Xe,Fe,me,ke.z,null,K)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(re))){let Xe=fe.update(A),Fe=A.material;if(ue&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ke.copy(A.boundingSphere.center)):(Xe.boundingSphere===null&&Xe.computeBoundingSphere(),ke.copy(Xe.boundingSphere.center)),ke.applyMatrix4(A.matrixWorld).applyMatrix4(ve)),Array.isArray(Fe)){let Ye=Xe.groups;for(let Ke=0,at=Ye.length;Ke<at;Ke++){let ct=Ye[Ke],Ze=Fe[ct.materialIndex];Ze&&Ze.visible&&w.push(A,Xe,Ze,me,ke.z,ct,K)}}else Fe.visible&&w.push(A,Xe,Fe,me,ke.z,null,K)}}let Be=A.children;for(let Xe=0,Fe=Be.length;Xe<Fe;Xe++)Ed(Be[Xe],K,me,ue)}function em(A,K,me,ue){let{opaque:de,transmissive:Be,transparent:Xe}=A;E.setupLightsView(me),ie===!0&&$e.setGlobalState(I.clippingPlanes,me),ue&&v.viewport(k.copy(ue)),de.length>0&&Fc(de,K,me),Be.length>0&&Fc(Be,K,me),Xe.length>0&&Fc(Xe,K,me),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function tm(A,K,me,ue){if((me.isScene===!0?me.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[ue.id]===void 0){let Ze=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[ue.id]=new en(1,1,{generateMipmaps:!0,type:Ze?Qn:Tn,minFilter:xi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}let Be=E.state.transmissionRenderTarget[ue.id],Xe=ue.viewport||k;Be.setSize(Xe.z*I.transmissionResolutionScale,Xe.w*I.transmissionResolutionScale);let Fe=I.getRenderTarget(),Ye=I.getActiveCubeFace(),Ke=I.getActiveMipmapLevel();I.setRenderTarget(Be),I.getClearColor(ee),O=I.getClearAlpha(),O<1&&I.setClearColor(16777215,.5),I.clear(),Re&&nt.render(me);let at=I.toneMapping;I.toneMapping=jn;let ct=ue.viewport;if(ue.viewport!==void 0&&(ue.viewport=void 0),E.setupLightsView(ue),ie===!0&&$e.setGlobalState(I.clippingPlanes,ue),Fc(A,me,ue),te.updateMultisampleRenderTarget(Be),te.updateRenderTargetMipmap(Be),ye.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let _t=0,Ht=K.length;_t<Ht;_t++){let Rt=K[_t],{object:wt,geometry:on,material:We,group:yn}=Rt;if(We.side===pi&&wt.layers.test(ue.layers)){let ft=We.side;We.side=gn,We.needsUpdate=!0,nm(wt,me,ue,on,We,yn),We.side=ft,We.needsUpdate=!0,Ze=!0}}Ze===!0&&(te.updateMultisampleRenderTarget(Be),te.updateRenderTargetMipmap(Be))}I.setRenderTarget(Fe,Ye,Ke),I.setClearColor(ee,O),ct!==void 0&&(ue.viewport=ct),I.toneMapping=at}function Fc(A,K,me){let ue=K.isScene===!0?K.overrideMaterial:null;for(let de=0,Be=A.length;de<Be;de++){let Xe=A[de],{object:Fe,geometry:Ye,group:Ke}=Xe,at=Xe.material;at.allowOverride===!0&&ue!==null&&(at=ue),Fe.layers.test(me.layers)&&nm(Fe,K,me,Ye,at,Ke)}}function nm(A,K,me,ue,de,Be){G!==null&&de.isNodeMaterial&&G.setObject(A,de),A.onBeforeRender(I,K,me,ue,de,Be),A.modelViewMatrix.multiplyMatrices(me.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),de.onBeforeRender(I,K,me,ue,A,Be),de.transparent===!0&&de.side===pi&&de.forceSinglePass===!1?(de.side=gn,de.needsUpdate=!0,I.renderBufferDirect(me,K,ue,de,A,Be),de.side=Zi,de.needsUpdate=!0,I.renderBufferDirect(me,K,ue,de,A,Be),de.side=pi):I.renderBufferDirect(me,K,ue,de,A,Be),A.onAfterRender(I,K,me,ue,de,Be)}function Oc(A,K,me){K.isScene!==!0&&(K=Ue);let ue=W.get(A),de=E.state.lights,Be=E.state.shadowsArray,Xe=de.state.version,Fe=Ce.getParameters(A,de.state,Be,K,me,E.state.lightProbeGridArray),Ye=Ce.getProgramCacheKey(Fe),Ke=ue.programs;ue.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?K.environment:null,ue.fog=K.fog;let at=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ue.envMap=_e.get(A.envMap||ue.environment,at),ue.envMapRotation=ue.environment!==null&&A.envMap===null?K.environmentRotation:A.envMapRotation,Ke===void 0&&(A.addEventListener("dispose",yi),Ke=new Map,ue.programs=Ke);let ct=Ke.get(Ye);if(ct!==void 0){if(ue.currentProgram===ct&&ue.lightsStateVersion===Xe)return sm(A,Fe),ct}else Fe.uniforms=Ce.getUniforms(A),G!==null&&A.isNodeMaterial&&G.build(A,me,Fe),A.onBeforeCompile(Fe,I),ct=Ce.acquireProgram(Fe,Ye),Ke.set(Ye,ct),ue.uniforms=Fe.uniforms;let Ze=ue.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ze.clippingPlanes=$e.uniform),sm(A,Fe),ue.needsLights=n_(A),ue.lightsStateVersion=Xe,ue.needsLights&&(Ze.ambientLightColor.value=de.state.ambient,Ze.lightProbe.value=de.state.probe,Ze.sunLights.value=de.state.sun,Ze.sunLightShadows.value=de.state.sunShadow,Ze.directionalLights.value=de.state.directional,Ze.directionalLightShadows.value=de.state.directionalShadow,Ze.spotLights.value=de.state.spot,Ze.spotLightShadows.value=de.state.spotShadow,Ze.rectAreaLights.value=de.state.rectArea,Ze.ltc_1.value=de.state.rectAreaLTC1,Ze.ltc_2.value=de.state.rectAreaLTC2,Ze.pointLights.value=de.state.point,Ze.pointLightShadows.value=de.state.pointShadow,Ze.hemisphereLights.value=de.state.hemi,Ze.sunShadowMatrix.value=de.state.sunShadowMatrix,Ze.sunShadowCascade.value=de.state.sunShadowCascade,Ze.directionalShadowMatrix.value=de.state.directionalShadowMatrix,Ze.spotLightMatrix.value=de.state.spotLightMatrix,Ze.spotLightMap.value=de.state.spotLightMap,Ze.pointShadowMatrix.value=de.state.pointShadowMatrix),ue.lightProbeGrid=E.state.lightProbeGridArray.length>0,ue.currentProgram=ct,ue.uniformsList=null,ct}function im(A){if(A.uniformsList===null){let K=A.currentProgram.getUniforms();A.uniformsList=Za.seqWithValue(K.seq,A.uniforms)}return A.uniformsList}function sm(A,K){let me=W.get(A);me.outputColorSpace=K.outputColorSpace,me.batching=K.batching,me.batchingColor=K.batchingColor,me.instancing=K.instancing,me.instancingColor=K.instancingColor,me.instancingMorph=K.instancingMorph,me.skinning=K.skinning,me.morphTargets=K.morphTargets,me.morphNormals=K.morphNormals,me.morphColors=K.morphColors,me.morphTargetsCount=K.morphTargetsCount,me.numClippingPlanes=K.numClippingPlanes,me.numIntersection=K.numClipIntersection,me.vertexAlphas=K.vertexAlphas,me.vertexTangents=K.vertexTangents,me.toneMapping=K.toneMapping}function Qx(A,K){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;_.setFromMatrixPosition(K.matrixWorld);for(let me=0,ue=A.length;me<ue;me++){let de=A[me];if(de.texture!==null&&de.boundingBox.containsPoint(_))return de}return null}function e_(A,K,me,ue,de){K.isScene!==!0&&(K=Ue),te.resetTextureUnits();let Be=K.fog,Xe=ue.isMeshStandardMaterial||ue.isMeshLambertMaterial||ue.isMeshPhongMaterial?K.environment:null,Fe=se===null?I.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:lt.workingColorSpace,Ye=ue.isMeshStandardMaterial||ue.isMeshLambertMaterial&&!ue.envMap||ue.isMeshPhongMaterial&&!ue.envMap,Ke=_e.get(ue.envMap||Xe,Ye),at=ue.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,ct=!!me.attributes.tangent&&(!!ue.normalMap||ue.anisotropy>0),Ze=!!me.morphAttributes.position,_t=!!me.morphAttributes.normal,Ht=!!me.morphAttributes.color,Rt=jn;ue.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Rt=I.toneMapping);let wt=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,on=wt!==void 0?wt.length:0,We=W.get(ue),yn=E.state.lights;if(ie===!0&&(pe===!0||A!==Z)){let At=A===Z&&ue.id===J;$e.setState(ue,A,At)}let ft=!1;ue.version===We.__version?(We.needsLights&&We.lightsStateVersion!==yn.state.version||We.outputColorSpace!==Fe||de.isBatchedMesh&&We.batching===!1||!de.isBatchedMesh&&We.batching===!0||de.isBatchedMesh&&We.batchingColor===!0&&de._colorsTexture===null||de.isBatchedMesh&&We.batchingColor===!1&&de._colorsTexture!==null||de.isInstancedMesh&&We.instancing===!1||!de.isInstancedMesh&&We.instancing===!0||de.isSkinnedMesh&&We.skinning===!1||!de.isSkinnedMesh&&We.skinning===!0||de.isInstancedMesh&&We.instancingColor===!0&&de.instanceColor===null||de.isInstancedMesh&&We.instancingColor===!1&&de.instanceColor!==null||de.isInstancedMesh&&We.instancingMorph===!0&&de.morphTexture===null||de.isInstancedMesh&&We.instancingMorph===!1&&de.morphTexture!==null||We.envMap!==Ke||ue.fog===!0&&We.fog!==Be||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==$e.numPlanes||We.numIntersection!==$e.numIntersection)||We.vertexAlphas!==at||We.vertexTangents!==ct||We.morphTargets!==Ze||We.morphNormals!==_t||We.morphColors!==Ht||We.toneMapping!==Rt||We.morphTargetsCount!==on||!!We.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,We.__version=ue.version);let Xn=We.currentProgram;ft===!0&&(Xn=Oc(ue,K,de),G&&ue.isNodeMaterial&&G.onUpdateProgram(ue,Xn,We));let vi=!1,ts=!1,Sr=!1,St=Xn.getUniforms(),Bt=We.uniforms;if(v.useProgram(Xn.program)&&(vi=!0,ts=!0,Sr=!0),ue.id!==J&&(J=ue.id,ts=!0),We.needsLights){let At=Qx(E.state.lightProbeGridArray,de);We.lightProbeGrid!==At&&(We.lightProbeGrid=At,ts=!0)}if(vi||Z!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),St.setValue(U,"projectionMatrix",A.projectionMatrix),St.setValue(U,"viewMatrix",A.matrixWorldInverse);let is=St.map.cameraPosition;is!==void 0&&is.setValue(U,we.setFromMatrixPosition(A.matrixWorld)),R.logarithmicDepthBuffer&&St.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ue.isMeshPhongMaterial||ue.isMeshToonMaterial||ue.isMeshLambertMaterial||ue.isMeshBasicMaterial||ue.isMeshStandardMaterial||ue.isShaderMaterial)&&St.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),Z!==A&&(Z=A,ts=!0,Sr=!0)}if(We.needsLights&&(yn.state.sunShadowMap.length>0&&St.setValue(U,"sunShadowMap",yn.state.sunShadowMap,te),yn.state.directionalShadowMap.length>0&&St.setValue(U,"directionalShadowMap",yn.state.directionalShadowMap,te),yn.state.spotShadowMap.length>0&&St.setValue(U,"spotShadowMap",yn.state.spotShadowMap,te),yn.state.pointShadowMap.length>0&&St.setValue(U,"pointShadowMap",yn.state.pointShadowMap,te)),de.isSkinnedMesh){St.setOptional(U,de,"bindMatrix"),St.setOptional(U,de,"bindMatrixInverse");let At=de.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),St.setValue(U,"boneTexture",At.boneTexture,te))}de.isBatchedMesh&&(St.setOptional(U,de,"batchingTexture"),St.setValue(U,"batchingTexture",de._matricesTexture,te),St.setOptional(U,de,"batchingIdTexture"),St.setValue(U,"batchingIdTexture",de._indirectTexture,te),St.setOptional(U,de,"batchingColorTexture"),de._colorsTexture!==null&&St.setValue(U,"batchingColorTexture",de._colorsTexture,te));let ns=me.morphAttributes;if((ns.position!==void 0||ns.normal!==void 0||ns.color!==void 0)&&j.update(de,me,Xn),(ts||We.receiveShadow!==de.receiveShadow)&&(We.receiveShadow=de.receiveShadow,St.setValue(U,"receiveShadow",de.receiveShadow)),(ue.isMeshStandardMaterial||ue.isMeshLambertMaterial||ue.isMeshPhongMaterial)&&ue.envMap===null&&K.environment!==null&&(Bt.envMapIntensity.value=K.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=G1()),ts){if(St.setValue(U,"toneMappingExposure",I.toneMappingExposure),We.needsLights&&t_(Bt,Sr),Be&&ue.fog===!0&&qe.refreshFogUniforms(Bt,Be),qe.refreshMaterialUniforms(Bt,ue,$,q,E.state.transmissionRenderTarget[A.id]),We.needsLights&&We.lightProbeGrid){let At=We.lightProbeGrid;Bt.probesSH.value=At.texture,Bt.probesMin.value.copy(At.boundingBox.min),Bt.probesMax.value.copy(At.boundingBox.max),Bt.probesResolution.value.copy(At.resolution)}Za.upload(U,im(We),Bt,te)}if(ue.isShaderMaterial&&ue.uniformsNeedUpdate===!0&&(Za.upload(U,im(We),Bt,te),ue.uniformsNeedUpdate=!1),ue.isSpriteMaterial&&St.setValue(U,"center",de.center),St.setValue(U,"modelViewMatrix",de.modelViewMatrix),St.setValue(U,"normalMatrix",de.normalMatrix),St.setValue(U,"modelMatrix",de.matrixWorld),ue.uniformsGroups!==void 0){let At=ue.uniformsGroups;for(let is=0,wr=At.length;is<wr;is++){let am=At[is];Se.update(am,Xn),Se.bind(am,Xn)}}return Xn}function t_(A,K){A.ambientLightColor.needsUpdate=K,A.lightProbe.needsUpdate=K,A.sunLights.needsUpdate=K,A.sunLightShadows.needsUpdate=K,A.directionalLights.needsUpdate=K,A.directionalLightShadows.needsUpdate=K,A.pointLights.needsUpdate=K,A.pointLightShadows.needsUpdate=K,A.spotLights.needsUpdate=K,A.spotLightShadows.needsUpdate=K,A.rectAreaLights.needsUpdate=K,A.hemisphereLights.needsUpdate=K}function n_(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(A,K,me){let ue=W.get(A);ue.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ue.__autoAllocateDepthBuffer===!1&&(ue.__useRenderToTexture=!1),W.get(A.texture).__webglTexture=K,W.get(A.depthTexture).__webglTexture=ue.__autoAllocateDepthBuffer?void 0:me,ue.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,K){let me=W.get(A);me.__webglFramebuffer=K,me.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(A,K=0,me=0){se=A,F=K,V=me;let ue=null,de=!1,Be=!1;if(A){let Fe=W.get(A);if(Fe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,Fe.__webglFramebuffer),k.copy(A.viewport),H.copy(A.scissor),D=A.scissorTest,v.viewport(k),v.scissor(H),v.setScissorTest(D),J=-1;return}else if(Fe.__webglFramebuffer===void 0)te.setupRenderTarget(A);else if(Fe.__hasExternalTextures)te.rebindTextures(A,W.get(A.texture).__webglTexture,W.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let at=A.depthTexture;if(Fe.__boundDepthTexture!==at){if(at!==null&&W.has(at)&&(A.width!==at.image.width||A.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(A)}}let Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Be=!0);let Ke=W.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ke[K])?ue=Ke[K][me]:ue=Ke[K],de=!0):A.samples>0&&te.useMultisampledRTT(A)===!1?ue=W.get(A).__webglMultisampledFramebuffer:Array.isArray(Ke)?ue=Ke[me]:ue=Ke,k.copy(A.viewport),H.copy(A.scissor),D=A.scissorTest}else k.copy(le).multiplyScalar($).floor(),H.copy(he).multiplyScalar($).floor(),D=Ae;if(me!==0&&(ue=z),v.bindFramebuffer(U.FRAMEBUFFER,ue)&&v.drawBuffers(A,ue),v.viewport(k),v.scissor(H),v.setScissorTest(D),de){let Fe=W.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+K,Fe.__webglTexture,me)}else if(Be){let Fe=K;for(let Ye=0;Ye<A.textures.length;Ye++){let Ke=W.get(A.textures[Ye]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ye,Ke.__webglTexture,me,Fe)}}else if(A!==null&&me!==0){let Fe=W.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Fe.__webglTexture,me)}J=-1};function rm(A){let K=W.get(A);return(K.__readFormat!==A.format||K.__readType!==A.type)&&(K.__readFormat=A.format,K.__readType=A.type,K.__formatReadable=R.textureFormatReadable(A.format),K.__typeReadable=R.textureTypeReadable(A.type)),K}this.readRenderTargetPixels=function(A,K,me,ue,de,Be,Xe,Fe=0){if(!(A&&A.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Xe!==void 0&&(Ye=Ye[Xe]),Ye){v.bindFramebuffer(U.FRAMEBUFFER,Ye);try{let Ke=A.textures[Fe],at=Ke.format,ct=Ke.type;A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Fe);let Ze=rm(Ke);if(Ze.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ze.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=A.width-ue&&me>=0&&me<=A.height-de&&U.readPixels(K,me,ue,de,Ne.convert(at),Ne.convert(ct),Be)}finally{let Ke=se!==null?W.get(se).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(A,K,me,ue,de,Be,Xe,Fe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Xe!==void 0&&(Ye=Ye[Xe]),Ye)if(K>=0&&K<=A.width-ue&&me>=0&&me<=A.height-de){v.bindFramebuffer(U.FRAMEBUFFER,Ye);let Ke=A.textures[Fe],at=Ke.format,ct=Ke.type;A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Fe);let Ze=rm(Ke);if(Ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _t=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,_t),U.bufferData(U.PIXEL_PACK_BUFFER,Be.byteLength,U.STREAM_READ),U.readPixels(K,me,ue,de,Ne.convert(at),Ne.convert(ct),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ht=se!==null?W.get(se).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Ht);let Rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await g0(U,Rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,_t),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Be),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(_t),U.deleteSync(Rt),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,K=null,me=0){let ue=Math.pow(2,-me),de=Math.floor(A.image.width*ue),Be=Math.floor(A.image.height*ue),Xe=K!==null?K.x:0,Fe=K!==null?K.y:0;te.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,me,0,0,Xe,Fe,de,Be),v.unbindTexture()},this.copyTextureToTexture=function(A,K,me=null,ue=null,de=0,Be=0){let Xe,Fe,Ye,Ke,at,ct,Ze,_t,Ht,Rt=A.isCompressedTexture?A.mipmaps[Be]:A.image;if(me!==null)Xe=me.max.x-me.min.x,Fe=me.max.y-me.min.y,Ye=me.isBox3?me.max.z-me.min.z:1,Ke=me.min.x,at=me.min.y,ct=me.isBox3?me.min.z:0;else{let Bt=Math.pow(2,-de);Xe=Math.floor(Rt.width*Bt),Fe=Math.floor(Rt.height*Bt),A.isDataArrayTexture?Ye=Rt.depth:A.isData3DTexture?Ye=Math.floor(Rt.depth*Bt):Ye=1,Ke=0,at=0,ct=0}ue!==null?(Ze=ue.x,_t=ue.y,Ht=ue.z):(Ze=0,_t=0,Ht=0);let wt=Ne.convert(K.format),on=Ne.convert(K.type),We;K.isData3DTexture?(te.setTexture3D(K,0),We=U.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(te.setTexture2DArray(K,0),We=U.TEXTURE_2D_ARRAY):(te.setTexture2D(K,0),We=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,K.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,K.unpackAlignment);let yn=v.getParameter(U.UNPACK_ROW_LENGTH),ft=v.getParameter(U.UNPACK_IMAGE_HEIGHT),Xn=v.getParameter(U.UNPACK_SKIP_PIXELS),vi=v.getParameter(U.UNPACK_SKIP_ROWS),ts=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,Rt.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Rt.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Ke),v.pixelStorei(U.UNPACK_SKIP_ROWS,at),v.pixelStorei(U.UNPACK_SKIP_IMAGES,ct);let Sr=A.isDataArrayTexture||A.isData3DTexture,St=K.isDataArrayTexture||K.isData3DTexture;if(A.isDepthTexture){let Bt=W.get(A),ns=W.get(K),At=W.get(Bt.__renderTarget),is=W.get(ns.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,At.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,is.__webglFramebuffer);for(let wr=0;wr<Ye;wr++)Sr&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(A).__webglTexture,de,ct+wr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,W.get(K).__webglTexture,Be,Ht+wr)),U.blitFramebuffer(Ke,at,Xe,Fe,Ze,_t,Xe,Fe,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(de!==0||A.isRenderTargetTexture||W.has(A)){let Bt=W.get(A),ns=W.get(K);v.bindFramebuffer(U.READ_FRAMEBUFFER,C),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,N);for(let At=0;At<Ye;At++)Sr?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Bt.__webglTexture,de,ct+At):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Bt.__webglTexture,de),St?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ns.__webglTexture,Be,Ht+At):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ns.__webglTexture,Be),de!==0?U.blitFramebuffer(Ke,at,Xe,Fe,Ze,_t,Xe,Fe,U.COLOR_BUFFER_BIT,U.NEAREST):St?U.copyTexSubImage3D(We,Be,Ze,_t,Ht+At,Ke,at,Xe,Fe):U.copyTexSubImage2D(We,Be,Ze,_t,Ke,at,Xe,Fe);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else St?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(We,Be,Ze,_t,Ht,Xe,Fe,Ye,wt,on,Rt.data):K.isCompressedArrayTexture?U.compressedTexSubImage3D(We,Be,Ze,_t,Ht,Xe,Fe,Ye,wt,Rt.data):U.texSubImage3D(We,Be,Ze,_t,Ht,Xe,Fe,Ye,wt,on,Rt):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Be,Ze,_t,Xe,Fe,wt,on,Rt.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Be,Ze,_t,Rt.width,Rt.height,wt,Rt.data):U.texSubImage2D(U.TEXTURE_2D,Be,Ze,_t,Xe,Fe,wt,on,Rt);v.pixelStorei(U.UNPACK_ROW_LENGTH,yn),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ft),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Xn),v.pixelStorei(U.UNPACK_SKIP_ROWS,vi),v.pixelStorei(U.UNPACK_SKIP_IMAGES,ts),Be===0&&K.generateMipmaps&&U.generateMipmap(We),v.unbindTexture()},this.initRenderTarget=function(A){W.get(A).__webglFramebuffer===void 0&&te.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?te.setTextureCube(A,0):A.isData3DTexture?te.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?te.setTexture2DArray(A,0):te.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){F=0,V=0,se=null,v.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}};var ix={type:"change"},Dp={type:"start"},rx={type:"end"},id=new ui,sx=new Ln,H1=Math.cos(70*Xa.DEG2RAD),Yt=new L,Fn=2*Math.PI,bt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lp=1e-6,sd=class extends La{constructor(e,t=null){super(e,t),this.state=bt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Gt,this._lastTargetPosition=new L,this._quat=new Gt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dr,this._sphericalDelta=new dr,this._scale=1,this._panOffset=new L,this._rotateStart=new Me,this._rotateEnd=new Me,this._rotateDelta=new Me,this._panStart=new Me,this._panEnd=new Me,this._panDelta=new Me,this._dollyStart=new Me,this._dollyEnd=new Me,this._dollyDelta=new Me,this._dollyDirection=new L,this._mouse=new Me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=X1.bind(this),this._onPointerDown=W1.bind(this),this._onPointerUp=q1.bind(this),this._onContextMenu=Q1.bind(this),this._onMouseWheel=Z1.bind(this),this._onKeyDown=J1.bind(this),this._onTouchStart=K1.bind(this),this._onTouchMove=j1.bind(this),this._onMouseDown=$1.bind(this),this._onMouseMove=Y1.bind(this),this._interceptControlDown=ew.bind(this),this._interceptControlUp=tw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=bt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ix),this.update(),this.state=bt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Yt.copy(t).sub(this.target),Yt.applyQuaternion(this._quat),this._spherical.setFromVector3(Yt),this.autoRotate&&this.state===bt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Fn:n>Math.PI&&(n-=Fn),i<-Math.PI?i+=Fn:i>Math.PI&&(i-=Fn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Yt.setFromSpherical(this._spherical),Yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Yt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(id.origin.copy(this.object.position),id.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(id.direction))<H1?this.object.lookAt(this.target):(sx.setFromNormalAndCoplanarPoint(this.object.up,this.target),id.intersectPlane(sx,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Lp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lp||this._lastTargetPosition.distanceToSquared(this.target)>Lp?(this.dispatchEvent(ix),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Fn/60*this.autoRotateSpeed*e:Fn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Yt.setFromMatrixColumn(t,0),Yt.multiplyScalar(-e),this._panOffset.add(Yt)}_panUp(e,t){this.screenSpacePanning===!0?Yt.setFromMatrixColumn(t,1):(Yt.setFromMatrixColumn(t,0),Yt.crossVectors(this.object.up,Yt)),Yt.multiplyScalar(e),this._panOffset.add(Yt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Yt.copy(i).sub(this.target);let r=Yt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function W1(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function X1(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function q1(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rx),this.state=bt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function $1(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case $i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=bt.DOLLY;break;case $i.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=bt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=bt.ROTATE}break;case $i.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=bt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=bt.PAN}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(Dp)}function Y1(s){switch(this.state){case bt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case bt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case bt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Z1(s){this.enabled===!1||this.enableZoom===!1||this.state!==bt.NONE||(s.preventDefault(),this.dispatchEvent(Dp),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(rx))}function J1(s){this.enabled!==!1&&this._handleKeyDown(s)}function K1(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=bt.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=bt.TOUCH_PAN;break;default:this.state=bt.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=bt.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=bt.TOUCH_DOLLY_ROTATE;break;default:this.state=bt.NONE}break;default:this.state=bt.NONE}this.state!==bt.NONE&&this.dispatchEvent(Dp)}function j1(s){switch(this._trackPointer(s),this.state){case bt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case bt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case bt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case bt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=bt.NONE}}function Q1(s){this.enabled!==!1&&s.preventDefault()}function ew(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tw(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ax=new Pt,rd=new L,Ka=class extends ur{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ve(e,3)),this.setAttribute("uv",new Ve(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new qi(t,6,1);return this.setAttribute("instanceStart",new mn(n,3,0)),this.setAttribute("instanceEnd",new mn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new qi(t,6,1);return this.setAttribute("instanceColorStart",new mn(n,3,0)),this.setAttribute("instanceColorEnd",new mn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new sr(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ax.setFromBufferAttribute(t),this.boundingBox.union(ax))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new It),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)rd.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(rd)),rd.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(rd));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ie.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Me},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};_n.line={uniforms:qa.merge([Ie.common,Ie.fog,Ie.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var ws=class extends tn{constructor(e){super({type:"LineMaterial",uniforms:qa.clone(_n.line.uniforms),vertexShader:_n.line.vertexShader,fragmentShader:_n.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Up=new ut,ox=new L,lx=new L,sn=new ut,rn=new ut,Pi=new ut,Np=new L,Fp=new Qe,an=new Ra,cx=new L,ad=new Pt,od=new It,Ii=new ut,Li,br;function hx(s,e,t){return Ii.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Ii.multiplyScalar(1/Ii.w),Ii.x=br/t.width,Ii.y=br/t.height,Ii.applyMatrix4(s.projectionMatrixInverse),Ii.multiplyScalar(1/Ii.w),Math.abs(Math.max(Ii.x,Ii.y))}function nw(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){an.start.fromBufferAttribute(i,o),an.end.fromBufferAttribute(r,o),an.applyMatrix4(t);let c=new L,h=new L;Li.distanceSqToSegment(an.start,an.end,h,c),h.distanceTo(c)<br*.5&&e.push({point:h,pointOnLine:c,distance:Li.origin.distanceTo(h),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function iw(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),u=-e.near;Li.at(1,Pi),Pi.w=1,Pi.applyMatrix4(e.matrixWorldInverse),Pi.applyMatrix4(n),Pi.multiplyScalar(1/Pi.w),Pi.x*=r.x/2,Pi.y*=r.y/2,Pi.z=0,Np.copy(Pi),Fp.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=h;d<f;d++){if(sn.fromBufferAttribute(l,d),rn.fromBufferAttribute(c,d),sn.w=1,rn.w=1,sn.applyMatrix4(Fp),rn.applyMatrix4(Fp),sn.z>u&&rn.z>u)continue;if(sn.z>u){let M=sn.z-rn.z,_=(sn.z-u)/M;sn.lerp(rn,_)}else if(rn.z>u){let M=rn.z-sn.z,_=(rn.z-u)/M;rn.lerp(sn,_)}sn.applyMatrix4(n),rn.applyMatrix4(n),sn.multiplyScalar(1/sn.w),rn.multiplyScalar(1/rn.w),sn.x*=r.x/2,sn.y*=r.y/2,rn.x*=r.x/2,rn.y*=r.y/2,an.start.copy(sn),an.start.z=0,an.end.copy(rn),an.end.z=0;let x=an.closestPointToPointParameter(Np,!0);an.at(x,cx);let m=Xa.lerp(sn.z,rn.z,x),g=m>=-1&&m<=1,y=Np.distanceTo(cx)<br*.5;if(g&&y){an.start.fromBufferAttribute(l,d),an.end.fromBufferAttribute(c,d),an.start.applyMatrix4(a),an.end.applyMatrix4(a);let M=new L,_=new L;Li.distanceSqToSegment(an.start,an.end,_,M),t.push({point:_,pointOnLine:M,distance:Li.origin.distanceTo(_),object:s,face:null,faceIndex:d,uv:null,uv1:null})}}}var ld=class extends Et{constructor(e=new Ka,t=new ws({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)ox.fromBufferAttribute(t,a),lx.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+ox.distanceTo(lx);let r=new qi(i,2,1);return e.setAttribute("instanceDistanceStart",new mn(r,1,0)),e.setAttribute("instanceDistanceEnd",new mn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Li=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;br=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),od.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=br*.5;else{let u=Math.max(i.near,od.distanceToPoint(Li.origin));c=hx(i,u,l.resolution)}if(od.radius+=c,Li.intersectsSphere(od)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ad.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=br*.5;else{let u=Math.max(i.near,ad.distanceToPoint(Li.origin));h=hx(i,u,l.resolution)}ad.expandByScalar(h),Li.intersectsBox(ad)!==!1&&(n?nw(this,t):iw(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Up),this.material.uniforms.resolution.value.set(Up.z,Up.w))}};var ja=class extends Ka{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var cd=class extends ld{constructor(e=new ja,t=new ws({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};var ei=class{constructor(e,{background:t=659224,camera:n=[9,-11,7],fov:i=45}={}){this.host=e,this.canvas=document.createElement("canvas"),this.canvas.className="three",e.append(this.canvas),this.renderer=new Pc({canvas:this.canvas,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.scene=new Ks,this.scene.background=null,this.renderer.setClearColor(t,0),this.camera=new Nt(i,1,.05,500),this.camera.up.set(0,0,1),this.camera.position.set(...n),this.controls=new sd(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.addEventListener("change",()=>this.invalidate()),this.scene.add(new hr(16777215,.75));let r=new cr(16777215,1.6);r.position.set(6,-8,12),this.scene.add(r),this.lineMats=new Set,this.dirty=!0,this.frameCbs=new Set,this.disposed=!1,this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize(),this._loop=this._loop.bind(this),this.raf=requestAnimationFrame(this._loop)}invalidate(){this.dirty=!0}onFrame(e){return this.frameCbs.add(e),()=>this.frameCbs.delete(e)}resize(){let e=this.host.clientWidth,t=this.host.clientHeight;if(!(!e||!t)){this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.isOrthographicCamera,this.camera.updateProjectionMatrix();for(let n of this.lineMats)n.resolution.set(e,t);this.invalidate()}}_loop(e){if(this.disposed)return;this.raf=requestAnimationFrame(this._loop);let t=this._last?Math.min(.1,(e-this._last)/1e3):.016;this._last=e;for(let n of this.frameCbs)n(t,e/1e3);this.controls.update()&&(this.dirty=!0),this.dirty&&(this.dirty=!1,this.renderer.render(this.scene,this.camera))}setView2D(e,t=16){this.controls.enableRotate=!e,e?(this.controls.target.set(0,0,0),this.camera.position.set(0,1e-4,t),this.camera.up.set(0,1,0)):(this.camera.up.set(0,0,1),this.camera.position.set(9,-11,7),this.controls.target.set(0,0,0)),this.controls.update(),this.invalidate()}fatLine(e,{color:t=16777215,width:n=2,colors:i=null,opacity:r=1,dashed:a=!1}={}){let o=new ja;o.setPositions(Array.from(e)),i&&o.setColors(Array.from(i));let l=new ws({color:i?16777215:t,linewidth:n,vertexColors:!!i,transparent:r<1,opacity:r,dashed:a,worldUnits:!1});l.resolution.set(this.host.clientWidth||800,this.host.clientHeight||600),this.lineMats.add(l);let c=new cd(o,l);return a&&c.computeLineDistances(),c.userData.mat=l,c}free(e){e&&(e.parent?.remove(e),e.traverse?.(t=>{t.geometry?.dispose?.();let n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(let i of n)this.lineMats.delete(i),i.map?.dispose?.(),i.dispose?.()}),this.invalidate())}clear(e){for(let t of[...e.children])this.free(t)}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.ro.disconnect(),this.controls.dispose(),this.clear(this.scene),this.renderer.dispose(),this.renderer.forceContextLoss?.(),this.canvas.remove()}};function Zt(s,{color:e="#e6ebf5",size:t=.5,bg:n=null}={}){let i=document.createElement("canvas"),r=i.getContext("2d"),a=56;r.font=`600 ${a}px "Segoe UI", sans-serif`;let o=Math.ceil(r.measureText(s).width)+24;i.width=o,i.height=a+24,r.font=`600 ${a}px "Segoe UI", sans-serif`,n&&(r.fillStyle=n,r.beginPath(),r.roundRect(0,0,i.width,i.height,14),r.fill()),r.fillStyle=e,r.textBaseline="middle",r.textAlign="center",r.fillText(s,i.width/2,i.height/2+2);let l=new oa(i);l.colorSpace=Qt;let c=new Qs(new ps({map:l,transparent:!0,depthTest:!1}));return c.scale.set(t*i.width/i.height,t,1),c.renderOrder=10,c}function Es(s=6,{grid:e=!0,labels:t=!0}={}){let n=new li,i=(r,a,o)=>{let l=new Ia(new L(...r),new L(0,0,0),s,a,s*.08,s*.04);if(n.add(l),t){let c=Zt(o,{color:"#"+a.toString(16).padStart(6,"0"),size:s*.07});c.position.set(r[0]*(s+s*.07),r[1]*(s+s*.07),r[2]*(s+s*.07)),n.add(c)}};if(i([1,0,0],16739179,"x"),i([0,1,0],8054146,"y"),i([0,0,1],7252223,"z"),e){let r=new Pa(s*2,Math.round(s*2),2767447,1713464);r.rotation.x=Math.PI/2,r.material.transparent=!0,r.material.opacity=.7,n.add(r)}return n}function Ts(s){s=Math.min(1,Math.max(0,s));let e=[[.05,.03,.53],[.42,0,.66],[.8,.28,.47],[.97,.59,.25],[.94,.98,.13]],t=s*(e.length-1),n=Math.min(e.length-2,Math.floor(t)),i=t-n;return e[n].map((r,a)=>r+(e[n+1][a]-r)*i)}function As(s,e,{color:t=16777215,size:n=.18}={}){let i=new xs(n*.45,n,10);i.rotateX(Math.PI/2),i.translate(0,0,n/2);let r=new Et(i,new kn({color:t}));return r.position.set(s[0],s[1],s[2]),r.quaternion.setFromUnitVectors(new L(0,0,1),new L(e[0],e[1],e[2]).normalize()),r}var Op=new Set,Bp=10,sw=1,zp={pos:16735324,neg:5217791},hd=(s,e,t,n=0)=>({id:sw++,q:s,x:e,y:t,z:n}),dt={charges:[hd(2,-2,0),hd(-2,2,0)],MAX_CHARGES:Bp,subscribe(s){return Op.add(s),()=>Op.delete(s)},emit(s="change"){for(let e of Op)e(s)},add(s={}){return this.charges.length>=Bp?!1:(this.charges.push(hd(s.q??1,s.x??0,s.y??0,s.z??0)),this.emit("structure"),!0)},remove(s){this.charges=this.charges.filter(e=>e.id!==s),this.emit("structure")},update(s,e,t="change"){let n=this.charges.find(i=>i.id===s);n&&(Object.assign(n,e),this.emit(t))},set(s){this.charges=s.slice(0,Bp).map(e=>hd(e.q,e.x,e.y,e.z??0)),this.emit("structure")},si({flat2d:s=!1}={}){return this.charges.map(e=>({q:e.q*1e-9,x:e.x,y:e.y,z:s?0:e.z}))}},Vp={una:{nombre:"Una carga positiva",cargas:[[3,0,0,0]]},dipolo:{nombre:"Dipolo el\xE9ctrico",cargas:[[2,-2,0,0],[-2,2,0,0]]},iguales:{nombre:"Dos cargas iguales",cargas:[[2,-2,0,0],[2,2,0,0]]},asimetrico:{nombre:"Cargas desiguales (+3, \u22121)",cargas:[[3,-2,0,0],[-1,2,0,0]]},cuadrupolo:{nombre:"Cuadrupolo",cargas:[[2,-2,-2,0],[-2,2,-2,0],[2,2,2,0],[-2,-2,2,0]]},anillo:{nombre:"Anillo de 8 cargas",cargas:Array.from({length:8},(s,e)=>[1,3*Math.cos(e*Math.PI/4),3*Math.sin(e*Math.PI/4),0])},placas:{nombre:"Hileras paralelas (\xB1)",cargas:[[1.5,-2.5,-3,0],[1.5,-2.5,-1,0],[1.5,-2.5,1,0],[1.5,-2.5,3,0],[-1.5,2.5,-3,0],[-1.5,2.5,-1,0],[-1.5,2.5,1,0],[-1.5,2.5,3,0]].map(([s,e,t,n])=>[s,e,t,n])},tetraedro:{nombre:"Tetraedro 3D (+/\u2212)",cargas:[[2,2,2,2],[-2,-2,-2,2],[2,-2,2,-2],[-2,2,-2,-2]]}};function ud({get2d:s=()=>!1}={}){let e=T("tbody"),t=T("select",{},T("option",{value:""},"Cargar configuraci\xF3n\u2026"),Object.entries(Vp).map(([h,u])=>T("option",{value:h},u.nombre)));t.addEventListener("input",()=>{let h=Vp[t.value];h&&dt.set(h.cargas.map(([u,d,f,p])=>({q:u,x:d,y:f,z:p}))),t.value=""});let n=On("+ A\xF1adir carga",()=>{let h=dt.charges.length,u=h*2.4;dt.add({q:h%2?-1:1,x:+(2.5*Math.cos(u)).toFixed(2),y:+(2.5*Math.sin(u)).toFixed(2),z:0})},"small"),i=T("span",{class:"note"}),r=(h,u,d,f,p,x)=>{let m=T("input",{type:"number",value:h[u],step:d,min:f,max:p,disabled:x});return m.addEventListener("input",()=>{let g=parseFloat(m.value);isFinite(g)&&dt.update(h.id,{[u]:g},"change")}),m.addEventListener("change",()=>dt.emit("commit")),T("td",{},m)};function a(){e.replaceChildren(...dt.charges.map((h,u)=>T("tr",{},T("td",{},T("span",{class:"dot",style:{background:h.q>=0?"#ff5c5c":"#4f9dff"}}),` ${u+1}`),r(h,"q",.1,-50,50),r(h,"x",.1,-6,6),r(h,"y",.1,-6,6),r(h,"z",.1,-6,6,s()),T("td",{},T("button",{class:"btn small danger",title:"Eliminar",onclick:()=>dt.remove(h.id)},"\u2715"))))),i.textContent=`${dt.charges.length}/${dt.MAX_CHARGES} cargas`,n.disabled=dt.charges.length>=dt.MAX_CHARGES}let o=dt.subscribe(h=>{h==="structure"?a():l()});function l(){let h=e.querySelectorAll("tr");dt.charges.forEach((u,d)=>{let f=h[d]?.querySelectorAll("input");if(!f)return;let p=[u.q,u.x,u.y,u.z];f.forEach((x,m)=>{document.activeElement!==x&&(x.value=+p[m].toFixed(3))})})}let c=ot("Cargas puntuales",T("div",{class:"row"},T("div",{class:"grow"},t),n),T("table",{class:"tbl"},T("thead",{},T("tr",{},["#","q (nC)","x (m)","y (m)","z (m)",""].map(h=>T("th",{},h)))),e),i);return a(),{el:c,refresh:a,destroy:o}}var Ic=88541878128e-22,_i=125663706212e-17,Qi=1/(4*Math.PI*Ic),An=1602176634e-28,Qa=91093837015e-41,dd=167262192369e-38,Cs=16605390666e-37;function Cn(s,e,t,n,i=1e-9){let r=0,a=0,o=0;for(let l=0;l<s.length;l++){let c=s[l],h=e-c.x,u=t-c.y,d=n-c.z,f=h*h+u*u+d*d+i*i,p=Qi*c.q/(f*Math.sqrt(f));r+=p*h,a+=p*u,o+=p*d}return[r,a,o]}function ti(s,e,t,n,i=1e-9){let r=0;for(let a=0;a<s.length;a++){let o=s[a],l=e-o.x,c=t-o.y,h=n-o.z;r+=Qi*o.q/Math.sqrt(l*l+c*c+h*h+i*i)}return r}function ux(s,e,t,n){return s.map(i=>{let r=e-i.x,a=t-i.y,o=n-i.z,l=Math.sqrt(r*r+a*a+o*o),c=Qi*i.q/l,h=Qi*i.q/(l*l);return{r:l,V:c,E:Math.abs(h),Ex:h*r/l,Ey:h*a/l,Ez:h*o/l}})}function dx(s){let e=0;for(let t=0;t<s.length;t++)for(let n=t+1;n<s.length;n++){let i=s[t],r=s[n],a=Math.hypot(i.x-r.x,i.y-r.y,i.z-r.z);e+=Qi*i.q*r.q/a}return e}function fx(s,e,t,n,i,r,a,o){let l=new Float32Array(a*o);for(let c=0;c<o;c++){let h=n+(i-n)*c/(o-1);for(let u=0;u<a;u++){let d=e+(t-e)*u/(a-1);l[c*a+u]=ti(s,d,h,r,.001)}}return l}function rw(s,e,t=1,n={}){let{h:i=.05,maxSteps:r=4e3,bound:a=12,capture:o=1.5*i}=n,l=(f,p,x)=>{let[m,g,y]=Cn(s,f,p,x,1e-6),M=Math.hypot(m,g,y)||1;return[t*m/M,t*g/M,t*y/M]},c=[e[0],e[1],e[2]],h=e[0],u=e[1],d=e[2];for(let f=0;f<r;f++){let p=l(h,u,d),x=l(h+.5*i*p[0],u+.5*i*p[1],d+.5*i*p[2]),m=l(h+.5*i*x[0],u+.5*i*x[1],d+.5*i*x[2]),g=l(h+i*m[0],u+i*m[1],d+i*m[2]);if(h+=i/6*(p[0]+2*x[0]+2*m[0]+g[0]),u+=i/6*(p[1]+2*x[1]+2*m[1]+g[1]),d+=i/6*(p[2]+2*x[2]+2*m[2]+g[2]),c.push(h,u,d),Math.abs(h)>a||Math.abs(u)>a||Math.abs(d)>a)break;let y=!1;for(let M of s)if(Math.hypot(h-M.x,u-M.y,d-M.z)<o&&f>6){y=!0;break}if(y)break}return new Float32Array(c)}function aw(s){let e=[],t=Math.PI*(3-Math.sqrt(5));for(let n=0;n<s;n++){let i=1-2*(n+.5)/s,r=Math.sqrt(1-i*i),a=n*t;e.push([r*Math.cos(a),r*Math.sin(a),i])}return e}function px(s,{total:e=48,mode3d:t=!0,h:n=.05,bound:i=12,r0:r=.12}={}){let a=Math.max(...s.map(h=>Math.abs(h.q)),1e-30),o=s.filter(h=>h.q>0).reduce((h,u)=>h+u.q,0),l=-s.filter(h=>h.q<0).reduce((h,u)=>h+u.q,0),c=[];for(let h of s){if(h.q===0)continue;let u=Math.max(4,Math.round(e*Math.abs(h.q)/a));if(h.q<0){let f=l>o?1-o/l:0;if(u=Math.round(u*f),u<1)continue}let d=t?aw(u):Array.from({length:u},(f,p)=>[Math.cos(2*Math.PI*(p+.5)/u),Math.sin(2*Math.PI*(p+.5)/u),0]);for(let f of d){let p=[h.x+r*f[0],h.y+r*f[1],h.z+r*f[2]],x=rw(s,p,h.q>0?1:-1,{h:n,bound:i});x.length>9&&c.push({points:x,sourceCharge:h})}}return c}function fd(s,e,t,n,i,r,a,o){let l=(r-i)/(e-1),c=(o-a)/(t-1),h=[],u=(d,f,p,x)=>(x===p?.5:(n-p)/(x-p))*(f-d)+d;for(let d=0;d<t-1;d++)for(let f=0;f<e-1;f++){let p=s[d*e+f],x=s[d*e+f+1],m=s[(d+1)*e+f+1],g=s[(d+1)*e+f],y=0;if(p>n&&(y|=1),x>n&&(y|=2),m>n&&(y|=4),g>n&&(y|=8),y===0||y===15)continue;let M=i+f*l,_=a+d*c,w=M+l,E=_+c,P=[u(M,w,p,x),_],b=[w,u(_,E,x,m)],S=[u(M,w,g,m),E],I=[M,u(_,E,p,g)],B=(G,z)=>h.push(G[0],G[1],z[0],z[1]);switch(y){case 1:case 14:B(I,P);break;case 2:case 13:B(P,b);break;case 3:case 12:B(I,b);break;case 4:case 11:B(b,S);break;case 6:case 9:B(P,S);break;case 7:case 8:B(I,S);break;case 5:case 10:{let G=(p+x+m+g)/4>n;y===5===G?(B(I,S),B(P,b)):(B(I,P),B(b,S));break}default:break}}return new Float32Array(h)}var mx=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],ow=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];function gx(s,e,t,n){let i=2*n/(e-1),r=[],a=new Float64Array(8),o=new Array(8),l=(h,u)=>{let d=a[h],f=a[u],p=f===d?.5:(t-d)/(f-d),x=o[h],m=o[u];return[x[0]+p*(m[0]-x[0]),x[1]+p*(m[1]-x[1]),x[2]+p*(m[2]-x[2])]},c=(...h)=>{for(let u of h)r.push(u[0],u[1],u[2])};for(let h=0;h<e-1;h++)for(let u=0;u<e-1;u++)for(let d=0;d<e-1;d++){let f=1/0,p=-1/0;for(let x=0;x<8;x++){let[m,g,y]=mx[x],M=s[((h+y)*e+(u+g))*e+(d+m)];a[x]=M,M<f&&(f=M),M>p&&(p=M)}if(!(t<f||t>p)){for(let x=0;x<8;x++){let[m,g,y]=mx[x];o[x]=[-n+(d+m)*i,-n+(u+g)*i,-n+(h+y)*i]}for(let x of ow){let m=x.filter(y=>a[y]<t),g=x.filter(y=>a[y]>=t);if(!(m.length===0||m.length===4))if(m.length===1){let y=m[0];c(l(y,g[0]),l(y,g[1]),l(y,g[2]))}else if(m.length===3){let y=g[0];c(l(y,m[0]),l(y,m[1]),l(y,m[2]))}else{let[y,M]=m,[_,w]=g,E=l(y,_),P=l(y,w),b=l(M,w),S=l(M,_);c(E,P,b,E,b,S)}}}}return new Float32Array(r)}function xx(s,e){return s.length?s[Math.min(s.length-1,Math.floor(e*s.length))]:1}function pd(s,e,t,n=200){let i=fx(s,-e,e,-e,e,t,n,n),r=Float32Array.from(i,Math.abs).sort(),a=Math.max(xx(r,.3),1e-9),o=Math.max(xx(r,.985),a*2),l=1/0,c=-1/0;for(let f of i)f<l&&(l=f),f>c&&(c=f);let h=Math.asinh(o/a),u=new Uint8ClampedArray(n*n*4),d=[13,19,31];for(let f=0;f<i.length;f++){let p=Math.max(-1,Math.min(1,Math.asinh(i[f]/a)/h)),x=Math.pow(Math.abs(p),.85),m=p>=0?[255,96,90]:[70,150,255],g=p>=0?[255,214,160]:[170,225,255],y=Math.max(0,(x-.8)/.2);for(let M=0;M<3;M++){let _=d[M]+(m[M]-d[M])*x;u[4*f+M]=_+(g[M]-_)*y}u[4*f+3]=255}return{vals:i,n,rgba:u,Vs:a,Vhi:o,vmin:l,vmax:c,levels(f){let p=[];for(let x=0;x<f;x++){let m=a*Math.pow(o/a,f===1?.5:x/(f-1));c>m&&p.push(m),l<-m&&p.push(-m)}return l<0&&c>0&&p.push(0),p}}}var md=null;function lw(){if(md)return md;let s=document.createElement("canvas");s.width=s.height=64;let e=s.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.45,"rgba(255,255,255,0.85)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),md=new oe.CanvasTexture(s),md}var Di=class{constructor(e,{size:t=.2,color:n=16777215,spacing:i=1.4,speed:r=2.2,maxPerLine:a=14}={}){this.stage=e,this.size=t,this.color=new oe.Color(n),this.spacing=i,this.speed=r,this.maxPerLine=a,this.lines=[],this.parts=[],this.enabled=!0,this.points=null,this.off=e.onFrame(o=>this.tick(o))}setLines(e){this.dispose(!1),this.lines=[],this.parts=[];for(let r of e){let a=r.pts.length/3;if(a<3)continue;let o=new Float32Array(a);for(let f=1;f<a;f++)o[f]=o[f-1]+Math.hypot(r.pts[3*f]-r.pts[3*f-3],r.pts[3*f+1]-r.pts[3*f-2],r.pts[3*f+2]-r.pts[3*f-1]);let l=o[a-1];if(l<1e-6)continue;let c={pts:r.pts,cum:o,total:l,n:a,flip:!!r.flip,fac:r.fac||null},h=Math.min(this.maxPerLine,Math.max(1,Math.round(l/this.spacing))),u=this.lines.push(c)-1,d=Math.random();for(let f=0;f<h;f++)this.parts.push({line:u,u:(f+d)/h*l,i:0})}let t=this.parts.length,n=new oe.BufferGeometry;n.setAttribute("position",new oe.BufferAttribute(new Float32Array(3*t),3));let i=new oe.PointsMaterial({size:this.size,map:lw(),color:this.color,transparent:!0,depthWrite:!1,blending:oe.AdditiveBlending,sizeAttenuation:!0});this.points=new oe.Points(n,i),this.points.frustumCulled=!1,this.points.visible=this.enabled,this.stage.scene.add(this.points),this.place(0)}setEnabled(e){this.enabled=e,this.points&&(this.points.visible=e),this.stage.invalidate()}place(e){if(!this.points)return;let t=this.points.geometry.attributes.position.array;for(let n=0;n<this.parts.length;n++){let i=this.parts[n],r=this.lines[i.line];if(e>0){let h=r.fac?r.fac[Math.min(r.n-1,i.i)]:1;i.u+=this.speed*h*e,i.u>=r.total&&(i.u-=r.total,i.i=0)}let a=r.flip?r.total-i.u:i.u,o=Math.min(i.i,r.n-2);if(r.flip){o=0;let h=0,u=r.n-1;for(;u-h>1;){let d=h+u>>1;r.cum[d]<=a?h=d:u=d}o=h}else{for(;o<r.n-2&&r.cum[o+1]<a;)o++;for(r.cum[o]>a&&(o=0);o<r.n-2&&r.cum[o+1]<a;)o++}i.i=r.flip?r.n-1-o:o;let l=r.cum[o+1]-r.cum[o]||1,c=(a-r.cum[o])/l;t[3*n]=r.pts[3*o]+c*(r.pts[3*o+3]-r.pts[3*o]),t[3*n+1]=r.pts[3*o+1]+c*(r.pts[3*o+4]-r.pts[3*o+1]),t[3*n+2]=r.pts[3*o+2]+c*(r.pts[3*o+5]-r.pts[3*o+2])}this.points.geometry.attributes.position.needsUpdate=!0,this.stage.invalidate()}tick(e){this.enabled&&this.points&&this.place(e)}dispose(e=!0){this.points&&(this.stage.free(this.points),this.points=null),e&&this.off()}};var Mt=6,cw=36,_x={id:"cargas",unidad:1,icono:"\u2295",titulo:"Visualizador de cargas",corto:"Campo, l\xEDneas y equipotenciales",mount(s){let e={mode3d:!0,lines:!0,nLines:36,equip:!0,nEq:3,level:25,map:!1,slice:0,arrows:!1,zero:!0,flow:!0,testSign:1},t=T("div",{class:"viewport"}),n=new ei(t);n.scene.add(Es(Mt,{labels:!0}));let i=new oe.Group,r=new oe.Group,a=new oe.Group,o=new oe.Group,l=new oe.Group,c=new oe.Group;n.scene.add(i,r,a,o,l,c);let h=new Di(n,{size:.26,color:16773544,spacing:1.25,speed:2.4}),u=[],d=n.scene.children.find(Q=>Q.isGroup&&Q.children.some(U=>U.isGridHelper)),f=T("div",{class:"hud"},"Pasa el cursor sobre el plano de corte"),p=T("div",{class:"hud"});t.append(T("div",{class:"hud-bottom"},f,p));let x=Rn([{value:"3d",label:"Vista 3D"},{value:"2d",label:"Vista 2D"}],"3d",Q=>{e.mode3d=Q==="3d",n.setView2D(!e.mode3d,15),e.mode3d||(e.map=!0,E.set(!0)),C.refresh(),ce(),D()}),m=zt({label:"L\xEDneas de campo el\xE9ctrico",value:e.lines,onInput:Q=>{e.lines=Q,D()}}),g=ht({label:"Cantidad de l\xEDneas",min:8,max:120,step:2,value:e.nLines,fmt:Q=>`${Q}`,onInput:qn(Q=>{e.nLines=Q,J()},60)}),y=zt({label:"Equipotenciales (superficies en 3D, curvas en 2D)",value:e.equip,onInput:Q=>{e.equip=Q,D()}}),M=ht({label:"Cantidad de niveles",min:1,max:5,step:1,value:e.nEq,fmt:Q=>`${Q}`,onInput:qn(Q=>{e.nEq=Q,k()},60)}),_=ht({label:"Nivel de |V| de la superficie (3D)",min:1,max:3e3,value:e.level,log:!0,unit:"V",digits:3,onInput:qn(Q=>{e.level=Q,k()},80)}),w=zt({label:"Mostrar superficie V = 0",value:e.zero,onInput:Q=>{e.zero=Q,k()}}),E=zt({label:"Mapa de potencial en plano de corte",value:e.map,onInput:Q=>{e.map=Q,D()}}),P=ht({label:"Altura del plano de corte z",min:-Mt,max:Mt,step:.1,value:0,unit:"m",onInput:qn(Q=>{e.slice=Q,Z(),H()},50)}),b=zt({label:"Vectores E en el plano de corte",value:e.arrows,onInput:Q=>{e.arrows=Q,D()}}),S=On("Restablecer c\xE1mara",()=>n.setView2D(!e.mode3d,15),"small"),I=zt({label:"Animar el flujo del campo (part\xEDculas sobre las l\xEDneas)",value:e.flow,onInput:Q=>{e.flow=Q,D()}}),B=Rn([{value:"1",label:"+ positiva"},{value:"-1",label:"\u2212 negativa"}],"1",Q=>{e.testSign=parseInt(Q,10)}),G=On("Soltar 10 al azar",()=>{for(let Q=0;Q<10;Q++)ke((Math.random()*2-1)*5,(Math.random()*2-1)*5,e.mode3d?(Math.random()*2-1)*3:0,e.testSign)},"small"),z=On("Quitar",()=>{Ue()},"small"),C=ud({get2d:()=>!e.mode3d}),N=Vt([{key:"Q",label:"Carga neta"},{key:"U",label:"Energ\xEDa del sistema"},{key:"V0",label:"V en el origen"},{key:"E0",label:"|E| en el origen"}]),F=T("aside",{class:"controls"},cn("Visualizador de cargas puntuales","Coloca hasta 10 cargas, arr\xE1stralas con el rat\xF3n y observa el campo el\xE9ctrico, sus l\xEDneas y las superficies equipotenciales.",["Unidad 1","2D / 3D"]),ot("Vista",T("div",{class:"row wrap"},x.el,S)),ot("Animaci\xF3n",I.el,T("div",{class:"field"},T("span",{class:"lbl"},T("span",{},"Carga de prueba (haz clic en el plano para soltarla)")),B.el),T("div",{class:"row wrap"},G,z),T("p",{class:"note"},"Las cargas de prueba obedecen F = qE (con algo de fricci\xF3n para que sigan las l\xEDneas): las positivas son repelidas por las positivas y atra\xEDdas por las negativas.")),ot("Capas",m.el,g.el,y.el,M.el,_.el,w.el,E.el,P.el,b.el),C.el,ot("Resumen del sistema",N.el),T("p",{class:"note"},"Ley de Coulomb: E = k \u03A3 q\u1D62 (r \u2212 r\u1D62)/|r \u2212 r\u1D62|\xB3 y V = k \u03A3 q\u1D62/|r \u2212 r\u1D62|. Las l\xEDneas salen de las cargas positivas y entran en las negativas; su densidad es proporcional a |E|."));s.append(T("div",{class:"mod"},F,T("div",{class:"stage"},t)));let V=()=>dt.si({flat2d:!e.mode3d});function se(){n.clear(i),u.length=0;for(let Q of dt.charges){let U=.14+.07*Math.cbrt(Math.abs(Q.q)),Te=new oe.Mesh(new oe.SphereGeometry(U,28,18),new oe.MeshStandardMaterial({color:Q.q>=0?zp.pos:zp.neg,emissive:Q.q>=0?6689041:1127270,roughness:.35}));Te.position.set(Q.x,Q.y,e.mode3d?Q.z:0),Te.userData.id=Q.id,i.add(Te);let ye=new oe.Mesh(new oe.SphereGeometry(U*1.9,20,14),new oe.MeshBasicMaterial({color:Q.q>=0?16739179:5941759,transparent:!0,opacity:.18,depthWrite:!1}));ye.position.copy(Te.position),ye.raycast=()=>{},ye.userData.base=U*1.9,ye.userData.sign=Q.q>=0?1:-1,i.add(ye),u.push(ye);let R=Zt(`${Q.q>0?"+":""}${+Q.q.toFixed(2)} nC`,{size:.36,color:"#ffffff"});R.position.set(Q.x,Q.y,(e.mode3d?Q.z:0)+U+.34),i.add(R)}n.invalidate()}function J(){n.clear(r);let Q=V();if(!Q.length)return;let U=px(Q,{total:e.nLines,mode3d:e.mode3d,h:.06,bound:11,r0:.16}),Te=[],ye=U.map(W=>{let te=new Float32Array(W.points.length/3);for(let _e=0;_e<te.length;_e++){let xe=Cn(Q,W.points[3*_e],W.points[3*_e+1],W.points[3*_e+2],1e-6);te[_e]=Math.log10(Math.hypot(xe[0],xe[1],xe[2])+1e-9),_e%7===0&&Te.push(te[_e])}return te});Te.sort((W,te)=>W-te);let R=Te[Math.floor(Te.length*.05)]??0,v=Te[Math.floor(Te.length*.95)]??1,X=[];U.forEach((W,te)=>{let _e=W.points.length/3,xe=new Float32Array(_e*3),ae=new Float32Array(_e);for(let Pe=0;Pe<_e;Pe++){let $e=Math.min(1,Math.max(0,(ye[te][Pe]-R)/(v-R||1)));xe.set(Ts(.15+.85*$e),3*Pe),ae[Pe]=.45+1.6*$e}X.push({pts:W.points,flip:W.sourceCharge.q<0,fac:ae}),r.add(n.fatLine(W.points,{colors:xe,width:1.8}));let fe=Math.max(1,Math.floor(_e*.45)),Ce=[W.points[3*fe],W.points[3*fe+1],W.points[3*fe+2]],qe=[W.points[3*fe+3],W.points[3*fe+4],W.points[3*fe+5]],Ee=W.sourceCharge.q>0?1:-1;r.add(As(Ce,[Ee*(qe[0]-Ce[0]),Ee*(qe[1]-Ce[1]),Ee*(qe[2]-Ce[2])],{color:16777215,size:.22}))}),h.setLines(X),h.setEnabled(e.flow&&e.lines),n.invalidate()}function Z(){n.clear(o);let Q=V();if(!Q.length)return;let U=e.mode3d?e.slice:0,Te=pd(Q,Mt,U,200);Z.last=Te;let ye=new oe.DataTexture(Te.rgba,Te.n,Te.n,oe.RGBAFormat);ye.needsUpdate=!0,ye.magFilter=oe.LinearFilter,ye.minFilter=oe.LinearFilter,ye.colorSpace=oe.SRGBColorSpace;let R=new oe.Mesh(new oe.PlaneGeometry(2*Mt,2*Mt),new oe.MeshBasicMaterial({map:ye,transparent:!0,opacity:e.mode3d?.62:.95,depthWrite:!1,side:oe.DoubleSide}));R.position.z=U-.001,R.userData.isMap=!0,o.add(R);let v=Te.levels(e.nEq*(e.mode3d?2:3));for(let X of v){let W=fd(Te.vals,Te.n,Te.n,X,-Mt,Mt,-Mt,Mt);if(!W.length)continue;let te=new Float32Array(W.length/4*6);for(let ae=0,fe=0;ae<W.length;ae+=4,fe+=6)te[fe]=W[ae],te[fe+1]=W[ae+1],te[fe+2]=U+.004,te[fe+3]=W[ae+2],te[fe+4]=W[ae+3],te[fe+5]=U+.004;let _e=new oe.BufferGeometry;_e.setAttribute("position",new oe.BufferAttribute(te,3));let xe=X===0?16777215:X>0?16765088:11066623;o.add(new oe.LineSegments(_e,new oe.LineBasicMaterial({color:xe,transparent:!0,opacity:X===0?.9:.55,depthWrite:!1})))}o.visible=e.map||!e.mode3d,n.invalidate()}function k(){if(n.clear(a),!e.mode3d){Z();return}let Q=V();if(!Q.length)return;let U=42,Te=new Float32Array(U*U*U);for(let X=0;X<U;X++)for(let W=0;W<U;W++)for(let te=0;te<U;te++)Te[(X*U+W)*U+te]=ti(Q,-Mt+2*Mt*te/(U-1),-Mt+2*Mt*W/(U-1),-Mt+2*Mt*X/(U-1),.001);let ye=1/0,R=-1/0;for(let X of Te)X<ye&&(ye=X),X>R&&(R=X);let v=[];for(let X=0;X<e.nEq;X++){let W=e.level*Math.pow(2,X);R>W&&v.push({v:W,color:16739179}),ye<-W&&v.push({v:-W,color:5941759})}e.zero&&ye<0&&R>0&&v.push({v:0,color:4906624,op:.16});for(let X of v){let W=gx(Te,U,X.v,Mt);if(!W.length)continue;let te=W.length/9,_e=new Float32Array(W.length);for(let ae=0;ae<te;ae++){let fe=0,Ce=0,qe=0;for(let Se=0;Se<3;Se++){let He=9*ae+3*Se,Ge=Cn(Q,W[He],W[He+1],W[He+2],.001),gt=Math.hypot(Ge[0],Ge[1],Ge[2])||1;_e[He]=-Ge[0]/gt,_e[He+1]=-Ge[1]/gt,_e[He+2]=-Ge[2]/gt,fe+=_e[He],Ce+=_e[He+1],qe+=_e[He+2]}let Ee=9*ae,Pe=W[Ee+3]-W[Ee],$e=W[Ee+4]-W[Ee+1],je=W[Ee+5]-W[Ee+2],nt=W[Ee+6]-W[Ee],j=W[Ee+7]-W[Ee+1],Le=W[Ee+8]-W[Ee+2],be=$e*Le-je*j,Ne=je*nt-Pe*Le,Oe=Pe*j-$e*nt;if(be*fe+Ne*Ce+Oe*qe<0)for(let Se=0;Se<3;Se++){let He=W[Ee+3+Se];W[Ee+3+Se]=W[Ee+6+Se],W[Ee+6+Se]=He;let Ge=_e[Ee+3+Se];_e[Ee+3+Se]=_e[Ee+6+Se],_e[Ee+6+Se]=Ge}}let xe=new oe.BufferGeometry;xe.setAttribute("position",new oe.BufferAttribute(W,3)),xe.setAttribute("normal",new oe.BufferAttribute(_e,3)),a.add(new oe.Mesh(xe,new oe.MeshPhongMaterial({color:X.color,transparent:!0,opacity:X.op??.3,side:oe.DoubleSide,depthWrite:!1,shininess:70,specular:6710886})))}n.invalidate()}function H(){n.clear(l);let Q=V();if(!Q.length)return;let U=e.mode3d?e.slice:0,Te=13,ye=2*Mt/(Te-1),R=[];for(let te=0;te<Te;te++)for(let _e=0;_e<Te;_e++){let xe=-Mt+_e*ye,ae=-Mt+te*ye,fe=Cn(Q,xe,ae,U,.01);R.push({x:xe,y:ae,e:fe,m:Math.hypot(fe[0],fe[1],fe[2])})}let v=R.map(te=>Math.log10(te.m+1e-9)).sort((te,_e)=>te-_e),X=v[Math.floor(v.length*.05)],W=v[Math.floor(v.length*.95)];for(let te of R){if(te.m===0)continue;let _e=Ts(.15+.85*((Math.log10(te.m+1e-9)-X)/(W-X||1))),xe=As([te.x,te.y,U+.02],te.e,{color:new oe.Color(_e[0],_e[1],_e[2]),size:.5});l.add(xe)}n.invalidate()}function D(){r.visible=e.lines,h.setEnabled(e.flow&&e.lines),a.visible=e.equip&&e.mode3d,o.visible=e.map||!e.mode3d,o.children.forEach(Q=>{Q.userData.isMap||(Q.visible=e.equip)}),l.visible=e.arrows,_.el.style.display=e.mode3d?"":"none",w.el.style.display=e.mode3d?"":"none",P.el.style.display=e.mode3d?"":"none",d&&(d.visible=e.mode3d),n.invalidate()}function ee(){let Q=V(),U=dt.charges.reduce((Te,ye)=>Te+ye.q,0);N.update({Q:[`${+U.toFixed(3)} nC`,`${dt.charges.length} carga(s)`],U:[Q.length>1?ge(dx(Q),"J"):"0 J",Q.length>1?"\u03A3 k q\u1D62q\u2C7C / r\u1D62\u2C7C":"se necesitan 2 cargas"],V0:[ge(ti(Q,0,0,0,.001),"V"),""],E0:[ge(Math.hypot(...Cn(Q,0,0,0,.001)),"V/m"),""]}),p.textContent=e.mode3d?"Arrastra una carga para moverla \xB7 rueda: zoom":"Vista 2D \xB7 arrastra cargas \xB7 rueda: zoom"}let O=()=>{se(),J(),k(),e.mode3d&&Z(),H(),D(),ee()},ce=O,q=qn(O,90),$=cm(()=>{se(),J(),Z(),H(),D(),ee()}),Y=dt.subscribe(Q=>{Q==="structure"||Q==="commit"?O():Q==="drag"?$():q()}),ne=new oe.Raycaster,le=new oe.Vector2,he=n.canvas,Ae=Q=>{let U=he.getBoundingClientRect();le.set((Q.clientX-U.left)/U.width*2-1,-((Q.clientY-U.top)/U.height)*2+1),ne.setFromCamera(le,n.camera)},re=null,ie=null;he.addEventListener("pointerdown",Q=>{if(Q.button!==0)return;Ae(Q);let U=ne.intersectObjects(i.children.filter(ye=>ye.isMesh),!1)[0];if(!U)return;Q.stopImmediatePropagation(),n.controls.enabled=!1;let Te=dt.charges.find(ye=>ye.id===U.object.userData.id);if(!Te){n.controls.enabled=!0;return}re={id:Te.id,plane:new oe.Plane(new oe.Vector3(0,0,1),-(e.mode3d?Te.z:0))},ie=null,he.setPointerCapture(Q.pointerId),he.style.cursor="grabbing"},{capture:!0}),he.addEventListener("pointermove",Q=>{if(Ae(Q),re){let R=new oe.Vector3;if(ne.ray.intersectPlane(re.plane,R)){let v=X=>Math.max(-Mt,Math.min(Mt,Math.round(X*20)/20));dt.update(re.id,{x:v(R.x),y:v(R.y)},"drag")}return}let U=ne.intersectObjects(i.children.filter(R=>R.isMesh),!1)[0];if(he.style.cursor=U?"grab":"default",!(e.map||!e.mode3d))return;let Te=e.mode3d?e.slice:0,ye=new oe.Vector3;if(ne.ray.intersectPlane(new oe.Plane(new oe.Vector3(0,0,1),-Te),ye)&&Math.abs(ye.x)<=Mt&&Math.abs(ye.y)<=Mt){let R=V(),v=Cn(R,ye.x,ye.y,Te,.001);f.textContent=`(${ye.x.toFixed(2)}, ${ye.y.toFixed(2)}, ${Te.toFixed(2)}) m  \xB7  V = ${ge(ti(R,ye.x,ye.y,Te,.001),"V")}  \xB7  |E| = ${ge(Math.hypot(...v),"V/m")}`}});let pe=Q=>{if(re){re=null,n.controls.enabled=!0,he.style.cursor="default";try{he.releasePointerCapture(Q.pointerId)}catch{}dt.emit("commit")}};he.addEventListener("pointerup",pe),he.addEventListener("pointercancel",pe);let ve=[],we=new oe.SphereGeometry(.11,14,10);function ke(Q,U,Te,ye){if(ve.length>=cw){let ae=ve.shift();n.free(ae.group)}let R=ye>0?16765773:5104081,v=new oe.Group,X=new oe.Mesh(we,new oe.MeshBasicMaterial({color:R})),W=new oe.Mesh(new oe.SphereGeometry(.26,12,8),new oe.MeshBasicMaterial({color:R,transparent:!0,opacity:.25,depthWrite:!1})),te=48,_e=new oe.BufferGeometry;_e.setAttribute("position",new oe.BufferAttribute(new Float32Array(3*te),3)),_e.setDrawRange(0,0);let xe=new oe.Line(_e,new oe.LineBasicMaterial({color:R,transparent:!0,opacity:.7}));xe.frustumCulled=!1,v.add(X,W,xe),c.add(v),ve.push({x:Q,y:U,z:Te,vx:0,vy:0,vz:0,sign:ye,body:X,glow:W,trail:xe,group:v,n:0,N:te,age:0}),n.invalidate()}function Ue(){for(;ve.length;)n.free(ve.pop().group);n.invalidate()}he.addEventListener("pointerdown",Q=>{ie=Q.button===0&&!re?[Q.clientX,Q.clientY]:null}),he.addEventListener("pointerup",Q=>{if(!ie||Math.hypot(Q.clientX-ie[0],Q.clientY-ie[1])>5){ie=null;return}ie=null,Ae(Q);let U=e.mode3d?e.slice:0,Te=new oe.Vector3;ne.ray.intersectPlane(new oe.Plane(new oe.Vector3(0,0,1),-U),Te)&&Math.abs(Te.x)<=Mt&&Math.abs(Te.y)<=Mt&&ke(Te.x,Te.y,U,e.testSign)});let Re=0;return n.onFrame(Q=>{Re+=Q;for(let R of u){let v=1+.14*Math.sin(Re*3+R.userData.sign);R.scale.setScalar(v),R.material.opacity=.14+.07*(.5+.5*Math.sin(Re*3))}if(u.length&&n.invalidate(),!ve.length)return;let U=V(),Te=4,ye=Math.min(Q,.05)/Te;for(let R=ve.length-1;R>=0;R--){let v=ve[R];for(let te=0;te<Te;te++){let _e=Cn(U,v.x,v.y,v.z,.06),xe=Math.hypot(_e[0],_e[1],_e[2])||1,ae=5*Math.min(xe/9,3)*v.sign;v.vx+=ae*_e[0]/xe*ye,v.vy+=ae*_e[1]/xe*ye,v.vz+=e.mode3d?ae*_e[2]/xe*ye:0;let fe=Math.exp(-.35*ye);v.vx*=fe,v.vy*=fe,v.vz*=fe,v.x+=v.vx*ye,v.y+=v.vy*ye,v.z+=v.vz*ye,e.mode3d||(v.z=0)}v.age+=Q;let X=Math.abs(v.x)>Mt*1.6||Math.abs(v.y)>Mt*1.6||Math.abs(v.z)>Mt*1.6||v.age>40;for(let te of U)Math.hypot(v.x-te.x,v.y-te.y,v.z-te.z)<.2&&(X=!0);if(X){n.free(v.group),ve.splice(R,1);continue}v.body.position.set(v.x,v.y,v.z),v.glow.position.copy(v.body.position);let W=v.trail.geometry.attributes.position.array;v.n<v.N?v.n++:W.copyWithin(0,3,3*v.N),W.set([v.x,v.y,v.z],3*(v.n-1)),v.trail.geometry.attributes.position.needsUpdate=!0,v.trail.geometry.setDrawRange(0,v.n)}n.invalidate()}),O(),D(),{destroy(){Y(),C.destroy(),h.dispose(),n.dispose()},stage:n}}};var Rs=["#4cc2ff","#ff9f6b","#7ae582","#c79bff","#ffd166"];function yx(s,e=6){let t=s/e,n=Math.pow(10,Math.floor(Math.log10(t))),i=t/n;return(i<1.5?1:i<3.5?2:i<7.5?5:10)*n}function gd(s){if(s===0)return"0";let e=Math.abs(s);return e>=1e5||e<.001?s.toExponential(1).replace("e+","e"):parseFloat(s.toPrecision(4)).toString()}var Lt=class{constructor(e={}){this.opts=e,this.canvas=T("canvas",{class:"chart"}),e.height&&(this.canvas.style.height=`${e.height}px`),this.data={series:[],markers:[],vlines:[]},this.hover=null,this.ro=new ResizeObserver(()=>this.draw()),this.ro.observe(this.canvas),this.canvas.addEventListener("pointermove",t=>{this.hover=t,this.draw()}),this.canvas.addEventListener("pointerleave",()=>{this.hover=null,this.draw()}),this.el=this.canvas}set(e){this.data={series:[],markers:[],vlines:[],...e},this.draw()}destroy(){this.ro.disconnect()}draw(){let e=this.canvas,t=window.devicePixelRatio||1,n=e.clientWidth,i=e.clientHeight;if(!n||!i)return;(e.width!==Math.round(n*t)||e.height!==Math.round(i*t))&&(e.width=Math.round(n*t),e.height=Math.round(i*t));let r=e.getContext("2d");r.setTransform(t,0,0,t,0,0),r.clearRect(0,0,n,i);let{series:a,markers:o,vlines:l}=this.data,c=58,h=14,u=12,d=38,f=n-c-h,p=i-u-d,x=1/0,m=-1/0,g=1/0,y=-1/0;for(let S of a)for(let I=0;I<S.x.length;I++)isFinite(S.y[I])&&(x=Math.min(x,S.x[I]),m=Math.max(m,S.x[I]),g=Math.min(g,S.y[I]),y=Math.max(y,S.y[I]));for(let S of o)x=Math.min(x,S.x),m=Math.max(m,S.x),g=Math.min(g,S.y),y=Math.max(y,S.y);if(!isFinite(x)){r.fillStyle="#93a0b8",r.fillText("Sin datos",20,30);return}this.opts.yZero!==!1&&g>0&&g<.6*y&&(g=0),m===x&&(m+=1,x-=1),y===g&&(y+=1,g-=1);let M=(y-g)*.06;y+=M,g!==0&&(g-=M);let _=S=>c+(S-x)/(m-x)*f,w=S=>u+p-(S-g)/(y-g)*p;r.font='11px "Segoe UI", sans-serif',r.textBaseline="middle",r.strokeStyle="#1f2a3f",r.fillStyle="#93a0b8",r.lineWidth=1;let E=yx(m-x,Math.max(3,f/90)),P=yx(y-g,Math.max(3,p/45));r.textAlign="right";for(let S=Math.ceil(g/P)*P;S<=y+1e-12;S+=P){let I=w(S);r.beginPath(),r.moveTo(c,I),r.lineTo(n-h,I),r.stroke(),r.fillText(this.opts.yfmt?this.opts.yfmt(S):gd(S),c-6,I)}r.textAlign="center",r.textBaseline="top";for(let S=Math.ceil(x/E)*E;S<=m+1e-12;S+=E){let I=_(S);r.beginPath(),r.moveTo(I,u),r.lineTo(I,u+p),r.stroke(),r.fillText(this.opts.xfmt?this.opts.xfmt(S):gd(S),I,u+p+5)}r.strokeStyle="#44536e",r.strokeRect(c,u,f,p),x<0&&m>0&&(r.beginPath(),r.moveTo(_(0),u),r.lineTo(_(0),u+p),r.stroke()),g<0&&y>0&&(r.beginPath(),r.moveTo(c,w(0)),r.lineTo(c+f,w(0)),r.stroke()),r.fillStyle="#c3cde0",r.textBaseline="alphabetic",this.opts.xlabel&&(r.textAlign="center",r.fillText(this.opts.xlabel,c+f/2,i-6)),this.opts.ylabel&&(r.save(),r.translate(13,u+p/2),r.rotate(-Math.PI/2),r.textAlign="center",r.fillText(this.opts.ylabel,0,0),r.restore()),r.save(),r.beginPath(),r.rect(c,u,f,p),r.clip();for(let S of l)r.strokeStyle=S.color||"#fbbf24",r.setLineDash([5,4]),r.beginPath(),r.moveTo(_(S.x),u),r.lineTo(_(S.x),u+p),r.stroke(),r.setLineDash([]),S.label&&(r.fillStyle=S.color||"#fbbf24",r.textAlign="left",r.textBaseline="top",r.fillText(S.label,_(S.x)+4,u+3));a.forEach((S,I)=>{r.strokeStyle=S.color||Rs[I%Rs.length],r.lineWidth=S.width||2,r.setLineDash(S.dash||[]),r.beginPath();let B=!1;for(let G=0;G<S.x.length;G++){if(!isFinite(S.y[G])){B=!1;continue}let z=_(S.x[G]),C=w(S.y[G]);B?r.lineTo(z,C):(r.moveTo(z,C),B=!0)}r.stroke(),r.setLineDash([])}),r.restore();for(let S of o)r.fillStyle=S.color||"#ffffff",r.strokeStyle="#0b0f17",r.lineWidth=2,r.beginPath(),r.arc(_(S.x),w(S.y),5,0,2*Math.PI),r.fill(),r.stroke(),S.label&&(r.fillStyle="#e6ebf5",r.textAlign="left",r.textBaseline="bottom",r.fillText(S.label,_(S.x)+8,w(S.y)-4));let b=c+8;if(r.textBaseline="middle",r.textAlign="left",a.forEach((S,I)=>{S.label&&(r.fillStyle=S.color||Rs[I%Rs.length],r.fillRect(b,u+10,14,3),r.fillStyle="#c3cde0",r.fillText(S.label,b+19,u+12),b+=28+r.measureText(S.label).width)}),this.hover&&a.length){let S=e.getBoundingClientRect(),I=this.hover.clientX-S.left;if(I>=c&&I<=c+f){let B=x+(I-c)/f*(m-x);r.strokeStyle="#ffffff44",r.beginPath(),r.moveTo(I,u),r.lineTo(I,u+p),r.stroke();let G=u+28;a.forEach((z,C)=>{let N=0;for(let Z=0;Z<z.x.length;Z++)Math.abs(z.x[Z]-B)<Math.abs(z.x[N]-B)&&(N=Z);let F=z.y[N];if(!isFinite(F))return;r.fillStyle=z.color||Rs[C%Rs.length],r.beginPath(),r.arc(_(z.x[N]),w(F),3.5,0,2*Math.PI),r.fill();let V=`${z.label?z.label+": ":""}${this.opts.yfmt?this.opts.yfmt(F):gd(F)}  @ ${this.opts.xfmt?this.opts.xfmt(z.x[N]):gd(z.x[N])}`;r.textAlign=I>c+f/2?"right":"left",r.textBaseline="middle",r.fillStyle="#0b0f17cc";let se=r.measureText(V).width+8,J=I>c+f/2?I-8:I+8;r.fillRect(I>c+f/2?J-se+4:J-4,G-8,se,16),r.fillStyle=z.color||Rs[C%Rs.length],r.fillText(V,J,G),G+=18})}}}};var Wn=6,vx={id:"potencial",unidad:1,icono:"V",titulo:"Calculadora de potencial",corto:"V(r) y E(r) en un punto",mount(s){let e={x:1,y:2,z:0},t={x:-3,y:-2,z:0},n="P",i={q0:1,m:1},r={},a=(z,C,N)=>{let F=["x","y","z"].map(V=>{let se=Jt({label:`${V} (m)`,value:C[V],step:.1,onInput:J=>{C[V]=J,b()}});return r[`${z}${V}`]=se,se.el});return ot(N,T("div",{class:"row"},...F.map(V=>T("div",{class:"grow"},V))))},o=Jt({label:"Carga de prueba q\u2080 (nC)",value:i.q0,step:.1,onInput:z=>{i.q0=z,b()}}),l=Jt({label:"Masa de q\u2080 (\xB5g)",value:i.m,step:.1,min:.001,onInput:z=>{i.m=z,b()}}),c=Rn([{value:"P",label:"Punto P"},{value:"Q",label:"Punto Q"}],"P",z=>{n=z}),h=ud(),u=T("aside",{class:"controls"},cn("Calculadora de potencial","Calcula el potencial V y el campo E en cualquier punto del espacio para la distribuci\xF3n de cargas definida. Haz clic en el mapa para mover el punto elegido.",["Unidad 1","Superposici\xF3n"]),h.el,a("P",e,"Punto P (donde se eval\xFAa)"),a("Q",t,"Punto Q (destino del trayecto P \u2192 Q)"),ot("Al hacer clic en el mapa coloco\u2026",c.el),ot("Trabajo y energ\xEDa",T("div",{class:"row"},T("div",{class:"grow"},o.el),T("div",{class:"grow"},l.el)),T("p",{class:"note"},"W(P\u2192Q) = q\u2080 (V_P \u2212 V_Q) = \u2212\u0394U. Si q\u2080 se suelta desde el reposo en P, llega a Q con v = \u221A(2W/m) (si W > 0)."))),d=T("canvas",{style:{width:"100%",maxWidth:"640px",aspectRatio:"1 / 1",borderRadius:"10px",border:"1px solid var(--line)",cursor:"crosshair",display:"block"}}),f=T("div",{class:"tooltip",style:{display:"none"}}),p=Vt([{key:"V",label:"Potencial V(P)"},{key:"E",label:"|E(P)|"},{key:"Ex",label:"Componentes de E"},{key:"ang",label:"Direcci\xF3n de E (xy)"}]),x=Vt([{key:"dV",label:"V_P \u2212 V_Q"},{key:"W",label:"Trabajo W(P\u2192Q)"},{key:"dU",label:"\u0394U de q\u2080"},{key:"v",label:"Rapidez final de q\u2080"}]),m=T("tbody"),g=new Lt({xlabel:"distancia s a lo largo de P \u2192 Q (m)",ylabel:"V (V)",yfmt:z=>ge(z,"V",2),xfmt:z=>z.toFixed(1),height:240}),y=new Lt({xlabel:"distancia s a lo largo de P \u2192 Q (m)",ylabel:"|E| (V/m)",yfmt:z=>ge(z,"",2),xfmt:z=>z.toFixed(1),height:240}),M=T("div",{class:"stage scroll"},T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Mapa del potencial en el plano z = z_P"),T("div",{class:"legend"},T("span",{},T("i",{style:{background:"#ff605a"}}),"V > 0"),T("span",{},T("i",{style:{background:"#4696ff"}}),"V < 0"),T("span",{},T("i",{style:{background:"#fff"}}),"P"),T("span",{},T("i",{style:{background:"#4ade80"}}),"Q")),d,T("p",{class:"help"},"Las curvas blancas son equipotenciales; el color usa una escala logar\xEDtmica con signo.")),T("div",{style:{display:"flex",flexDirection:"column",gap:"14px",minWidth:0}},T("div",{class:"card"},T("h3",{},"Resultado en P"),p.el,T("span",{class:"formula"},"V = \u03A3 k q\u1D62 / r\u1D62        E = \u03A3 k q\u1D62 r\u0302\u1D62 / r\u1D62\xB2")),T("div",{class:"card"},T("h3",{},"Aporte de cada carga"),T("table",{class:"tbl"},T("thead",{},T("tr",{},["Carga","q\u1D62 (nC)","r\u1D62 (m)","V\u1D62","% de V","E\u1D62"].map(z=>T("th",{},z)))),m)),T("div",{class:"card"},T("h3",{},"Trayecto P \u2192 Q"),x.el))),T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Potencial a lo largo del segmento P \u2192 Q"),g.el),T("div",{class:"card"},T("h3",{},"Magnitud del campo a lo largo del segmento P \u2192 Q"),y.el)),f);s.append(T("div",{class:"mod"},u,M));let _=document.createElement("canvas"),w=null,E=(z,C,N)=>[(z+Wn)/(2*Wn)*N,N-(C+Wn)/(2*Wn)*N];function P(){let z=dt.si(),C=window.devicePixelRatio||1,N=Math.round(d.clientWidth*C)||560;d.width!==N&&(d.width=N,d.height=N);let F=d.getContext("2d");if(F.clearRect(0,0,N,N),z.length){w=pd(z,Wn,e.z,200),_.width=_.height=w.n;let H=new ImageData(w.rgba,w.n,w.n);_.getContext("2d").putImageData(H,0,0),F.imageSmoothingEnabled=!0,F.save(),F.translate(0,N),F.scale(1,-1),F.drawImage(_,0,0,N,N),F.restore(),F.lineWidth=1.2*C;for(let D of w.levels(6)){let ee=fd(w.vals,w.n,w.n,D,-Wn,Wn,-Wn,Wn);F.strokeStyle=D===0?"rgba(255,255,255,.95)":D>0?"rgba(255,220,180,.55)":"rgba(180,225,255,.55)",F.beginPath();for(let O=0;O<ee.length;O+=4){let ce=E(ee[O],ee[O+1],N),q=E(ee[O+2],ee[O+3],N);F.moveTo(ce[0],ce[1]),F.lineTo(q[0],q[1])}F.stroke()}}F.strokeStyle="rgba(255,255,255,.12)",F.lineWidth=C,F.beginPath(),F.moveTo(N/2,0),F.lineTo(N/2,N),F.moveTo(0,N/2),F.lineTo(N,N/2),F.stroke();let[V,se]=E(e.x,e.y,N),[J,Z]=E(t.x,t.y,N);F.setLineDash([6*C,5*C]),F.strokeStyle="#ffffff",F.lineWidth=1.5*C,F.beginPath(),F.moveTo(V,se),F.lineTo(J,Z),F.stroke(),F.setLineDash([]);for(let H of dt.charges){let[D,ee]=E(H.x,H.y,N);F.fillStyle=H.q>=0?"#ff5c5c":"#4f9dff",F.strokeStyle="#0b0f17",F.lineWidth=2*C,F.beginPath(),F.arc(D,ee,(6+1.5*Math.cbrt(Math.abs(H.q)))*C,0,2*Math.PI),F.fill(),F.stroke(),F.fillStyle="#fff",F.font=`bold ${11*C}px sans-serif`,F.textAlign="center",F.textBaseline="middle",F.fillText(H.q>=0?"+":"\u2212",D,ee+C)}let k=(H,D,ee,O)=>{F.fillStyle=ee,F.strokeStyle="#0b0f17",F.lineWidth=2*C,F.beginPath(),F.arc(H,D,6*C,0,2*Math.PI),F.fill(),F.stroke(),F.fillStyle="#fff",F.font=`bold ${13*C}px sans-serif`,F.textAlign="left",F.textBaseline="bottom",F.fillText(O,H+9*C,D-5*C)};k(V,se,"#ffffff","P"),k(J,Z,"#4ade80","Q")}function b(){let z=dt.si();if(!z.length)return;let C=ti(z,e.x,e.y,e.z),N=Cn(z,e.x,e.y,e.z),F=Math.hypot(...N);p.update({V:[ge(C,"V"),"k \u03A3 q/r"],E:[ge(F,"V/m"),""],Ex:[`(${vn(N[0],3)}, ${vn(N[1],3)}, ${vn(N[2],3)})`,"V/m"],ang:[`${om(Math.atan2(N[1],N[0])).toFixed(1)}\xB0`,"respecto a +x"]});let V=ux(z,e.x,e.y,e.z),se=V.reduce(($,Y)=>$+Math.abs(Y.V),0)||1;m.replaceChildren(...V.map(($,Y)=>T("tr",{},T("td",{},T("span",{class:"dot",style:{background:dt.charges[Y].q>=0?"#ff5c5c":"#4f9dff"}}),` ${Y+1}`),T("td",{},+dt.charges[Y].q.toFixed(2)),T("td",{},isFinite($.r)?$.r.toFixed(3):"0"),T("td",{},ge($.V,"V",3)),T("td",{},`${(100*Math.abs($.V)/se).toFixed(1)} %`),T("td",{},ge($.E,"V/m",3)))));let J=ti(z,t.x,t.y,t.z),k=i.q0*1e-9*(C-J),H=k>0?Math.sqrt(2*k/(i.m*1e-9)):0;x.update({dV:[ge(C-J,"V"),""],W:[ge(k,"J"),k>=0?"el campo realiza trabajo":"se necesita trabajo externo",k>=0?"good":"warn"],dU:[ge(-k,"J"),"\u0394U = q\u2080(V_Q \u2212 V_P)"],v:[k>0?ge(H,"m/s"):"\u2014",k>0?"liberada desde el reposo":""]});let D=240,ee=Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)||1e-9,O=[],ce=[],q=[];for(let $=0;$<=D;$++){let Y=$/D,ne=e.x+Y*(t.x-e.x),le=e.y+Y*(t.y-e.y),he=e.z+Y*(t.z-e.z);O.push(Y*ee),ce.push(ti(z,ne,le,he,.02)),q.push(Math.hypot(...Cn(z,ne,le,he,.02)))}g.set({series:[{x:O,y:ce,label:"V(s)"}],markers:[{x:0,y:C,color:"#fff",label:"P"},{x:ee,y:J,color:"#4ade80",label:"Q"}]}),y.set({series:[{x:O,y:q,label:"|E|(s)",color:"#ff9f6b"}],markers:[{x:0,y:F,color:"#fff",label:"P"}]}),P()}let S=qn(b,40),I=dt.subscribe(()=>S()),B=z=>{let C=d.getBoundingClientRect();return[(z.clientX-C.left)/C.width*2*Wn-Wn,Wn-(z.clientY-C.top)/C.height*2*Wn]};d.addEventListener("click",z=>{let[C,N]=B(z),F=n==="P"?e:t;F.x=+C.toFixed(2),F.y=+N.toFixed(2),r[`${n}x`].set(F.x),r[`${n}y`].set(F.y),b()}),d.addEventListener("pointermove",z=>{let[C,N]=B(z),F=dt.si(),V=Cn(F,C,N,e.z,.01);f.style.display="block",f.style.left=`${z.clientX+14}px`,f.style.top=`${z.clientY+14}px`,f.textContent=`(${C.toFixed(2)}, ${N.toFixed(2)}) m \xB7 V = ${ge(ti(F,C,N,e.z,.01),"V")} \xB7 |E| = ${ge(Math.hypot(...V),"V/m")}`}),d.addEventListener("pointerleave",()=>{f.style.display="none"});let G=new ResizeObserver(()=>P());return G.observe(d),b(),{destroy(){I(),G.disconnect(),h.destroy(),g.destroy(),y.destroy()}}}};function xd(s){let e=Math.pow(10,Math.floor(Math.log10(s))),t=s/e;return(t<=1?1:t<=2?2:t<=5?5:10)*e}var eo=class{constructor(e,{duration:t=9,particleColor:n=16769126}={}){this.stage=e,this.group=new oe.Group,e.scene.add(this.group),this.frac=0,this.playing=!1,this.speed=1,this.duration=t,this.particleColor=n,this.listeners=new Set,this.showVel=!0,this.forceFn=null,this.off=e.onFrame(i=>this.tick(i))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}load(e,t){this.stage.clear(this.group),this.run=e,this.u=t;let n=e.t.length,i=new Float32Array(3*n),r=new Float32Array(3*n),a=new Float32Array(3*n),o=0,l=1/0,c=new Float64Array(n);for(let u=0;u<n;u++)i[3*u]=e.pos[3*u]/t,i[3*u+1]=e.pos[3*u+1]/t,i[3*u+2]=e.pos[3*u+2]/t,c[u]=Math.hypot(e.vel[3*u],e.vel[3*u+1],e.vel[3*u+2]),o=Math.max(o,c[u]),l=Math.min(l,c[u]);for(let u=0;u<n;u++){let d=Ts(.25+.7*((c[u]-l)/(o-l||1)));r.set(d,3*u),a.set(d.map(f=>f*.55),3*u)}this.pos=i,this.full=this.stage.fatLine(i,{colors:a,width:1.4,opacity:.45}),this.trail=this.stage.fatLine(i,{colors:r,width:3.4}),this.sphere=new oe.Mesh(new oe.SphereGeometry(.2,24,16),new oe.MeshStandardMaterial({color:this.particleColor,emissive:6706432,roughness:.3})),this.arrow=new oe.ArrowHelper(new oe.Vector3(1,0,0),new oe.Vector3,1.5,8054146,.35,.2),this.farrow=new oe.ArrowHelper(new oe.Vector3(0,0,1),new oe.Vector3,1.5,16735354,.35,.2),this.group.add(this.full,this.trail,this.sphere,this.arrow,this.farrow);let h=new oe.Mesh(new oe.SphereGeometry(.1,12,8),new oe.MeshBasicMaterial({color:16777215}));h.position.set(i[0],i[1],i[2]),this.group.add(h),this.render()}focus(){if(!this.pos)return;let e=this.pos,t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let a=0;a<e.length;a+=3)for(let o=0;o<3;o++)t[o]=Math.min(t[o],e[a+o]),n[o]=Math.max(n[o],e[a+o]);let i=new oe.Vector3((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),r=this.stage.controls.target.clone();this.stage.controls.target.copy(i),this.stage.camera.position.add(i.clone().sub(r)),this.stage.controls.update(),this.stage.invalidate()}get T(){return this.run?this.run.t[this.run.t.length-1]:0}play(){this.frac>=1&&(this.frac=0),this.playing=!0,this.emit()}pause(){this.playing=!1,this.emit()}restart(){this.frac=0,this.playing=!0,this.render(),this.emit()}seek(e){this.frac=Math.min(1,Math.max(0,e)),this.render(),this.emit()}emit(){for(let e of this.listeners)e(this)}tick(e){!this.playing||!this.run||(this.frac+=e*this.speed/this.duration,this.frac>=1&&(this.frac=1,this.playing=!1),this.render(),this.emit())}index(e){let t=this.run.t,n=0,i=t.length-1;for(;i-n>1;){let r=n+i>>1;t[r]<=e?n=r:i=r}return n}state(){let{t:e,pos:t,vel:n}=this.run,i=this.frac*this.T,r=this.index(i),a=Math.min(r+1,e.length-1),o=a===r?0:(i-e[r])/(e[a]-e[r]),l=(c,h)=>c[3*r+h]+o*(c[3*a+h]-c[3*r+h]);return{t:i,i:r,r:[l(t,0),l(t,1),l(t,2)],v:[l(n,0),l(n,1),l(n,2)]}}render(){if(!this.run)return;let e=this.state();this.sphere.position.set(e.r[0]/this.u,e.r[1]/this.u,e.r[2]/this.u),this.trail.geometry.instanceCount=Math.max(1,e.i);let t=Math.hypot(...e.v);if(this.arrow.visible=this.showVel&&t>0,t>0&&(this.arrow.position.copy(this.sphere.position),this.arrow.setDirection(new oe.Vector3(e.v[0],e.v[1],e.v[2]).normalize()),this.arrow.setLength(1.8,.4,.22)),this.farrow.visible=!1,this.forceFn){let n=this.forceFn(e.r,e.v),i=Math.hypot(n[0],n[1],n[2]);i>0&&(this.farrow.visible=!0,this.farrow.position.copy(this.sphere.position),this.farrow.setDirection(new oe.Vector3(n[0],n[1],n[2]).normalize()),this.farrow.setLength(1.2+.5*Math.log10(1+i*1e15),.38,.22))}this.stage.invalidate()}dispose(){this.off(),this.stage.clear(this.group),this.group.parent?.remove(this.group)}};function _d(s,{label:e=t=>`t = ${ge(t.frac*t.T,"s",3)}`}={}){let t=On("\u25B6 Reproducir",()=>s.playing?s.pause():s.play(),"primary small"),n=On("\u27F2",()=>s.restart(),"small"),i=ln({options:[{value:.25,label:"0.25\xD7"},{value:.5,label:"0.5\xD7"},{value:1,label:"1\xD7"},{value:2,label:"2\xD7"},{value:4,label:"4\xD7"}],value:1,onInput:c=>{s.speed=parseFloat(c)}});i.input.value="1";let r=T("input",{type:"range",min:0,max:1e3,value:0,style:{flex:1,minWidth:"120px"}}),a=T("span",{class:"hud"},e(s));r.addEventListener("input",()=>{let c=r.value/1e3;s.pause(),s.seek(c)});let o=s.onChange(c=>{t.textContent=c.playing?"\u23F8 Pausa":"\u25B6 Reproducir",document.activeElement!==r&&(r.value=Math.round(c.frac*1e3)),a.textContent=e(c)});return{el:T("div",{class:"row wrap",style:{padding:"8px 4px"}},t,n,T("div",{style:{width:"78px"}},i.el),r,a),destroy:o}}var yd=(s,e)=>[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]],hw=[0,.2,.3,.8,.8888888888888888,1,1],uw=[[],[1/5],[3/40,9/40],[44/45,-56/15,32/9],[19372/6561,-25360/2187,64448/6561,-212/729],[9017/3168,-355/33,46732/5247,49/176,-5103/18656],[35/384,0,500/1113,125/192,-2187/6784,11/84]],dw=[35/384,0,500/1113,125/192,-2187/6784,11/84,0],fw=[5179/57600,0,7571/16695,393/640,-92097/339200,187/2100,1/40];function pw(s,e,t,n,{rtol:i=1e-9,atol:r=1e-12,hmax:a=1/0,maxSteps:o=4e5}={}){let l=t.length,c=Array.isArray(r)?r:new Array(l).fill(r),h=e,u=t.slice(),d=[h],f=[u.slice()],p=Math.min(a,(n-e)/100),x=[];for(let m=0;m<o&&h<n;m++){h+p>n&&(p=n-h),x=[s(h,u)];for(let _=1;_<7;_++){let w=u.map((E,P)=>{let b=0;for(let S=0;S<_;S++)b+=uw[_][S]*x[S][P];return E+p*b});x.push(s(h+hw[_]*p,w))}let g=0,y=new Array(l);for(let _=0;_<l;_++){let w=0,E=0;for(let S=0;S<7;S++)w+=dw[S]*x[S][_],E+=fw[S]*x[S][_];y[_]=u[_]+p*w;let P=u[_]+p*E,b=c[_]+i*Math.max(Math.abs(u[_]),Math.abs(y[_]));g=Math.max(g,Math.abs(y[_]-P)/b)}g<=1&&(h+=p,u=y,d.push(h),f.push(u.slice()));let M=g===0?5:Math.min(5,Math.max(.2,.9*Math.pow(g,-.2)));if(p=Math.min(a,p*M),p<1e-30)break}return{t:d,y:f}}function vd(s){let{q:e,m:t,r0:n,v0:i,T:r,Efun:a=()=>[0,0,0],Bfun:o=()=>[0,0,0],method:l="rk45",nSamples:c=1200}=s;if(l==="boris")return mw({...s,Efun:a,Bfun:o,nSteps:s.nSteps||c});let h=e/t,u=(y,M)=>{let _=a(M[0],M[1],M[2]),w=o(M[0],M[1],M[2]),E=yd([M[3],M[4],M[5]],w);return[M[3],M[4],M[5],h*(_[0]+E[0]),h*(_[1]+E[1]),h*(_[2]+E[2])]},d=Math.hypot(...i)||1,f=Math.max(d*r,1e-12),p=pw(u,0,[...n,...i],r,{rtol:1e-10,atol:[f*1e-12,f*1e-12,f*1e-12,d*1e-12,d*1e-12,d*1e-12],hmax:r/c}),x=p.t.length,m=new Float64Array(3*x),g=new Float64Array(3*x);for(let y=0;y<x;y++)m.set(p.y[y].slice(0,3),3*y),g.set(p.y[y].slice(3,6),3*y);return{t:Float64Array.from(p.t),pos:m,vel:g,method:"rk45"}}function mw({q:s,m:e,r0:t,v0:n,T:i,Efun:r,Bfun:a,nSteps:o}){let l=i/o,c=s/e,h=new Float64Array(3*(o+1)),u=new Float64Array(3*(o+1)),d=new Float64Array(o+1),f=t.slice(),p=n.slice();h.set(f,0),u.set(p,0);for(let x=1;x<=o;x++){let m=r(f[0],f[1],f[2]),g=a(f[0],f[1],f[2]),y=.5*c*l,M=[p[0]+y*m[0],p[1]+y*m[1],p[2]+y*m[2]],_=[y*g[0],y*g[1],y*g[2]],w=_[0]*_[0]+_[1]*_[1]+_[2]*_[2],E=[2*_[0]/(1+w),2*_[1]/(1+w),2*_[2]/(1+w)],P=yd(M,_),b=[M[0]+P[0],M[1]+P[1],M[2]+P[2]],S=yd(b,E),I=[M[0]+S[0],M[1]+S[1],M[2]+S[2]],B=[I[0]+y*m[0],I[1]+y*m[1],I[2]+y*m[2]];f=[f[0]+.5*l*(p[0]+B[0]),f[1]+.5*l*(p[1]+B[1]),f[2]+.5*l*(p[2]+B[2])],p=B,h.set(f,3*x),u.set(p,3*x),d[x]=x*l}return{t:d,pos:h,vel:u,method:"boris"}}function bd(s,e){let t=e.length/3,n=new Float64Array(t);for(let i=0;i<t;i++)n[i]=.5*s*(e[3*i]**2+e[3*i+1]**2+e[3*i+2]**2);return n}function bx({q:s,m:e,v0:t,E:n,B:i}){let r=Math.hypot(...i),a={omega:0,period:1/0,radius:1/0,vParallel:0,vPerp:0,drift:[0,0,0],driftSpeed:0};if(r===0)return a;let o=i.map(d=>d/r),l=t[0]*o[0]+t[1]*o[1]+t[2]*o[2],h=yd(n,i).map(d=>d/(r*r)),u=[t[0]-l*o[0]-h[0],t[1]-l*o[1]-h[1],t[2]-l*o[2]-h[2]];return a.omega=Math.abs(s)*r/e,a.period=2*Math.PI/a.omega,a.vParallel=l,a.vPerp=Math.hypot(...u),a.radius=a.vPerp/a.omega,a.drift=h,a.driftSpeed=Math.hypot(...h),a}var Mx={electron:{nombre:"Electr\xF3n (\u2212e, 9.11\xD710\u207B\xB3\xB9 kg)",qe:-1,m:Qa},proton:{nombre:"Prot\xF3n (+e, 1.67\xD710\u207B\xB2\u2077 kg)",qe:1,m:dd},alpha:{nombre:"Part\xEDcula \u03B1 (+2e, 4.00 u)",qe:2,m:4.001506*Cs},custom:{nombre:"Personalizada\u2026",qe:1,m:12*Cs}},kp={crt:{nombre:"Tubo de rayos cat\xF3dicos: deflexi\xF3n de un electr\xF3n",particle:"electron",speed:2e7,elev:0,azim:0,r0:[0,0,0],E:[0,-15e3,0],T:26e-10,charges:null},freno:{nombre:"Prot\xF3n frenado por un campo opuesto (regresa)",particle:"proton",speed:2e5,elev:0,azim:0,r0:[0,0,0],E:[-4e3,0,0],T:11e-7,charges:null},oblicuo:{nombre:"Lanzamiento oblicuo de un prot\xF3n (par\xE1bola)",particle:"proton",speed:1e5,elev:45,azim:0,r0:[0,0,0],E:[0,0,-1e3],T:15e-7,charges:null},dispersion:{nombre:"Dispersi\xF3n de un prot\xF3n por una carga fija de +5 nC",particle:"proton",speed:15e4,elev:0,azim:0,r0:[-5,.5,0],E:[0,0,0],T:7e-5,charges:[[5,0,0,0]]},orbita:{nombre:"\xD3rbita circular de un electr\xF3n alrededor de +5 nC",particle:"electron",speed:Math.sqrt(Qi*5e-9*An/(Qa*1)),elev:0,azim:90,r0:[1,0,0],E:[0,0,0],T:3*(2*Math.PI/Math.sqrt(Qi*5e-9*An/(Qa*1))),charges:[[5,0,0,0]]}},Sx={id:"trayectoria",unidad:1,icono:"\u2197",titulo:"Simulador de trayectoria",corto:"Part\xEDcula en campos el\xE9ctricos",mount(s){let e={particle:"electron",qe:-1,mu:12,speed:2e7,elev:0,azim:0,r0:[0,0,0],E:[0,-15e3,0],T:26e-10,useCharges:!1},t=null,n=1,i=T("div",{class:"viewport"}),r=new ei(i,{camera:[10,-12,8]}),a=new oe.Group;r.scene.add(a);let o=new oe.Group;r.scene.add(o);let l=new eo(r),c=T("div",{class:"hud"}),h=T("div",{class:"hud"});i.append(T("div",{class:"overlay-bar"},c),T("div",{class:"hud-bottom"},h));let u=ln({label:"Escenarios de ejemplo",options:[{value:"",label:"Elegir un escenario\u2026"},...Object.entries(kp).map(([k,H])=>({value:k,label:H.nombre}))],onInput:k=>{k&&N(kp[k]),u.set("")}}),d=ln({label:"Part\xEDcula",options:Object.entries(Mx).map(([k,H])=>({value:k,label:H.nombre})),value:e.particle,onInput:k=>{e.particle=k,C(),F()}}),f=Jt({label:"Carga (en m\xFAltiplos de e)",value:1,step:1,onInput:k=>{e.qe=k,F()}}),p=Jt({label:"Masa (u)",value:12,step:.5,min:.001,onInput:k=>{e.mu=k,F()}}),x=T("div",{class:"row"},T("div",{class:"grow"},f.el),T("div",{class:"grow"},p.el)),m=ht({label:"Rapidez inicial v\u2080",min:100,max:1e8,value:e.speed,log:!0,fmt:k=>ge(k,"m/s",3),onInput:k=>{e.speed=k,F()}}),g=ht({label:"Elevaci\xF3n (desde el plano xy)",min:-90,max:90,step:1,value:0,unit:"\xB0",onInput:k=>{e.elev=k,F()}}),y=ht({label:"Azimut (desde +x)",min:-180,max:180,step:1,value:0,unit:"\xB0",onInput:k=>{e.azim=k,F()}}),M=["x","y","z"].map((k,H)=>Jt({label:`${k}\u2080 (m)`,value:0,step:.1,onInput:D=>{e.r0[H]=D,F()}})),_=["x","y","z"].map((k,H)=>Jt({label:`E${k} (V/m)`,value:0,step:100,onInput:D=>{e.E[H]=D,F()}})),w=zt({label:"Incluir el campo de las cargas puntuales del m\xF3dulo 1",value:!1,onInput:k=>{e.useCharges=k,F()}}),E=ht({label:"Duraci\xF3n de la simulaci\xF3n T",min:1e-10,max:.001,value:e.T,log:!0,fmt:k=>ge(k,"s",3),onInput:k=>{e.T=k,F()}}),P=T("p",{class:"note"}),b=T("aside",{class:"controls"},cn("Simulador de trayectoria","Lanza una part\xEDcula cargada y observa su movimiento bajo un campo el\xE9ctrico uniforme y/o el campo de cargas fijas. Integraci\xF3n num\xE9rica RK45 adaptativa.",["Unidad 1","Din\xE1mica"]),ot("Escenarios",u.el),ot("Part\xEDcula",d.el,x),ot("Condiciones iniciales",m.el,g.el,y.el,T("div",{class:"row"},...M.map(k=>T("div",{class:"grow"},k.el)))),ot("Campo el\xE9ctrico",T("div",{class:"row"},..._.map(k=>T("div",{class:"grow"},k.el))),w.el,P),ot("Tiempo",E.el),T("p",{class:"note"},"m d\xB2r/dt\xB2 = q E(r). Con E uniforme: r = r\u2080 + v\u2080t + \xBD(qE/m)t\xB2. Con cargas fijas el teorema trabajo\u2013energ\xEDa exige \u0394K = \u2212q \u0394V.")),S=Vt([{key:"a0",label:"Aceleraci\xF3n inicial"},{key:"vf",label:"Rapidez final"},{key:"rf",label:"Posici\xF3n final (m)"},{key:"K0",label:"Energ\xEDa cin\xE9tica inicial"},{key:"Kf",label:"Energ\xEDa cin\xE9tica final"},{key:"we",label:"Verificaci\xF3n \u0394K = \u2212q\u0394V"},{key:"an",label:"Comparaci\xF3n anal\xEDtica"},{key:"steps",label:"Pasos del integrador"}]),I=new Lt({xlabel:"tiempo (s)",ylabel:"energ\xEDa (eV)",xfmt:k=>ge(k,"s",2),yfmt:k=>ge(k,"eV",2),height:250,yZero:!1}),B=_d(l),G=T("div",{class:"stage scroll"},i,B.el,T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Resultados de la simulaci\xF3n"),S.el),T("div",{class:"card"},T("h3",{},"Conservaci\xF3n de la energ\xEDa mec\xE1nica"),I.el,T("p",{class:"help"},"K (cin\xE9tica) + U (potencial = q V) debe permanecer constante: el campo el\xE9ctrico es conservativo."))));s.append(T("div",{class:"mod"},b,G));function z(){let k=Mx[e.particle];return e.particle==="custom"?{q:e.qe*An,m:e.mu*Cs}:{q:k.qe*An,m:k.m}}function C(){x.style.display=e.particle==="custom"?"":"none"}function N(k){Object.assign(e,{particle:k.particle,speed:k.speed,elev:k.elev,azim:k.azim,r0:[...k.r0],E:[...k.E],T:k.T,useCharges:!!k.charges}),k.charges&&dt.set(k.charges.map(([H,D,ee,O])=>({q:H,x:D,y:ee,z:O}))),d.set(e.particle),C(),m.set(e.speed),g.set(e.elev),y.set(e.azim),E.set(e.T),M.forEach((H,D)=>H.set(e.r0[D])),_.forEach((H,D)=>H.set(e.E[D])),w.set(e.useCharges),F(),l.focus(),l.restart()}function F(){let{q:k,m:H}=z(),D=e.useCharges?dt.si():[];P.textContent=e.useCharges?`Se usan ${D.length} carga(s) del m\xF3dulo \xABVisualizador de cargas\xBB (posiciones en metros).`:"Activa la casilla para a\xF1adir el campo de las cargas del m\xF3dulo 1.";let ee=(Y,ne,le)=>{let he=D.length?Cn(D,Y,ne,le,1e-4):[0,0,0];return[he[0]+e.E[0],he[1]+e.E[1],he[2]+e.E[2]]},O=Er(e.elev),ce=Er(e.azim),q=[e.speed*Math.cos(O)*Math.cos(ce),e.speed*Math.cos(O)*Math.sin(ce),e.speed*Math.sin(O)];t=vd({q:k,m:H,r0:e.r0,v0:q,T:e.T,Efun:ee,method:"rk45",nSamples:1200}),t.meta={q:k,m:H,ch:D,v0:q};let $=0;for(let Y=0;Y<t.pos.length;Y++)$=Math.max($,Math.abs(t.pos[Y]));for(let Y of D)$=Math.max($,Math.abs(Y.x),Math.abs(Y.y),Math.abs(Y.z));n=xd(Math.max($,1e-12)/7),V(),l.load(t,n),l.forceFn=Y=>{let ne=ee(Y[0],Y[1],Y[2]);return[k*ne[0],k*ne[1],k*ne[2]]},J()}function V(){r.clear(a),r.clear(o),a.add(Es(10,{labels:!0})),c.textContent=`Cada divisi\xF3n = ${ge(n,"m",2)}  \xB7  ejes de \xB1${ge(10*n,"m",2)}`;let{ch:k,q:H}=t.meta;for(let ee of k){let O=new oe.Mesh(new oe.SphereGeometry(.28,24,16),new oe.MeshStandardMaterial({color:ee.q>=0?16735324:5217791,emissive:ee.q>=0?6689041:1127270}));O.position.set(ee.x/n,ee.y/n,ee.z/n),o.add(O);let ce=Zt(`${ee.q>0?"+":""}${(ee.q*1e9).toFixed(1)} nC`,{size:.5});ce.position.set(ee.x/n,ee.y/n,ee.z/n+.7),o.add(ce)}let D=Math.hypot(...e.E);if(D>0){let ee=new oe.Vector3(...e.E).normalize(),O=new oe.ArrowHelper(ee,new oe.Vector3(-8,8,0),3.2,16755021,.7,.4);o.add(O);let ce=Zt(`E = ${ge(D,"V/m",3)}`,{color:"#ffa94d",size:.6});ce.position.set(-8+ee.x*3.8,8+ee.y*3.8,ee.z*3.8+.8),o.add(ce)}r.invalidate()}function se(k){let{q:H,ch:D}=t.meta,ee=t.pos[3*k],O=t.pos[3*k+1],ce=t.pos[3*k+2],q=(D.length?ti(D,ee,O,ce,1e-4):0)-(e.E[0]*ee+e.E[1]*O+e.E[2]*ce);return H*q}function J(){let{q:k,m:H,ch:D,v0:ee}=t.meta,O=t.t.length-1,ce=bd(H,t.vel),q=Cn(D,...e.r0,1e-4),$=[q[0]+e.E[0],q[1]+e.E[1],q[2]+e.E[2]],Y=Math.hypot(...$)*Math.abs(k)/H,ne=[t.pos[3*O],t.pos[3*O+1],t.pos[3*O+2]],le=Math.hypot(t.vel[3*O],t.vel[3*O+1],t.vel[3*O+2]),he=se(O)-se(0),Ae=Math.abs(ce[O]-ce[0]+he)/(Math.abs(ce[0])+Math.abs(he)+1e-300),re=le/3e8,ie=["\u2014","s\xF3lo con E uniforme y sin cargas"];if(!D.length){let Re=t.t[O],Q=$.map(ye=>k*ye/H),U=e.r0.map((ye,R)=>ye+ee[R]*Re+.5*Q[R]*Re*Re),Te=Math.hypot(...U.map((ye,R)=>ye-ne[R]))/(Math.hypot(...U)||1);ie=[`error ${Te.toExponential(1)}`,"frente a r\u2080 + v\u2080t + \xBDat\xB2",Te<1e-6?"good":"warn"]}S.update({a0:[ge(Y,"m/s\xB2"),"a = qE/m"],vf:[ge(le,"m/s"),re>.1?"\u26A0 v > 0.1c: efectos relativistas":`${(100*re).toFixed(3)} % de c`,re>.1?"warn":""],rf:[`(${vn(ne[0],3)}, ${vn(ne[1],3)}, ${vn(ne[2],3)})`,""],K0:[`${ge(ce[0],"J")}`,`${ge(ce[0]/An,"eV")}`],Kf:[`${ge(ce[O],"J")}`,`${ge(ce[O]/An,"eV")}`],we:[`error ${Ae.toExponential(1)}`,"\u0394K + \u0394U = 0",Ae<1e-5?"good":"warn"],an:ie,steps:[`${O}`,"RK45 adaptativo"]});let pe=Math.max(1,Math.floor(O/400)),ve=[],we=[],ke=[],Ue=[];for(let Re=0;Re<=O;Re+=pe){ve.push(t.t[Re]);let Q=ce[Re]/An,U=se(Re)/An;we.push(Q),ke.push(U),Ue.push(Q+U)}I.set({series:[{x:ve,y:we,label:"K"},{x:ve,y:ke,label:"U = qV",color:"#ff9f6b"},{x:ve,y:Ue,label:"K + U",color:"#7ae582",dash:[6,4]}]})}l.onChange(k=>{if(!k.run)return;let H=k.state();h.textContent=`t = ${ge(H.t,"s",3)} \xB7 v = ${ge(Math.hypot(...H.v),"m/s",3)} \xB7 r = (${vn(H.r[0],2)}, ${vn(H.r[1],2)}, ${vn(H.r[2],2)}) m`}),i.append(T("div",{class:"overlay-bar",style:{top:"auto",bottom:"52px",justifyContent:"flex-end"}},T("div",{class:"hud"},T("span",{style:{color:"#7ae582"}},"\u2192 velocidad v"),"  ",T("span",{style:{color:"#ff5c7a"}},"\u2192 fuerza F = qE"))));let Z=dt.subscribe(qn(()=>{e.useCharges&&F()},100));return C(),N(kp.crt),{destroy(){Z(),B.destroy(),l.dispose(),I.destroy(),r.dispose()}}}};var Gp=[{id:"vacio",nombre:"Vac\xEDo",kappa:1,Emax:1/0,color:"#8892a6"},{id:"aire",nombre:"Aire",kappa:1.00059,Emax:3e6,color:"#a6c8ff"},{id:"teflon",nombre:"Tefl\xF3n",kappa:2.1,Emax:6e7,color:"#f2f2f2"},{id:"papel",nombre:"Papel",kappa:3.7,Emax:16e6,color:"#e8d9a8"},{id:"mica",nombre:"Mica",kappa:5.4,Emax:118e6,color:"#c79bff"},{id:"vidrio",nombre:"Vidrio Pyrex",kappa:5.6,Emax:14e6,color:"#7fe3d1"},{id:"agua",nombre:"Agua destilada",kappa:80,Emax:65e6,color:"#4aa8ff"},{id:"titanato",nombre:"Titanato de estroncio",kappa:310,Emax:8e6,color:"#ff9f6b"}],gw=(s,e,t=1)=>t*Ic*s/e;function Lc(s,e,t,n){return gw(s,e,1)*(1+(t-1)*n)}function wx({C:s,V:e,Q:t}){if(s!==void 0&&e!==void 0)t=s*e;else if(s!==void 0&&t!==void 0)e=t/s;else if(e!==void 0&&t!==void 0)s=t/e;else throw new Error("Se requieren dos de C, V, Q");return{C:s,V:e,Q:t,U:.5*s*e*e}}var xw=s=>1/s.reduce((e,t)=>e+1/t,0),_w=s=>s.reduce((e,t)=>e+t,0);function Ex(s,e,t){if(t==="serie"){let r=xw(s),a=r*e,o=s.map(l=>({C:l,Q:a,V:a/l,U:a*a/(2*l)}));return{Ceq:r,Q:a,U:.5*r*e*e,items:o}}let n=_w(s),i=s.map(r=>({C:r,Q:r*e,V:e,U:.5*r*e*e}));return{Ceq:n,Q:n*e,U:.5*n*e*e,items:i}}function Tx(s,e,t,n){let i=e*t,r=s*(1-Math.exp(-n/i));return{vc:r,i:s/e*Math.exp(-n/i),uC:.5*t*r*r,tau:i}}function Ax(s,e,t,n){let i=e*t,r=s*Math.exp(-n/i);return{vc:r,i:-(s/e)*Math.exp(-n/i),uC:.5*t*r*r,tau:i}}var Cx=500,Dc={V:12,A:100,d:2,mat:"aire",kappa:5,x:1};function yw(s){let e=s;return()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296)}var Rx={id:"capacitor",unidad:2,icono:"C",titulo:"Simulador de capacitores",corto:"\xC1rea, distancia y diel\xE9ctrico",mount(s){let e={...Dc,mode:"conectada",Qiso:0},t=Lc(Dc.A*1e-4,Dc.d*.001,1.00059,1)*Dc.V,n=T("div",{class:"viewport"}),i=new ei(n,{camera:[6.2,-7.6,4.1],fov:42});i.controls.target.set(-.7,0,.1);let r=new oe.GridHelper(20,20,2767447,1581621);r.rotation.x=Math.PI/2,r.position.z=-2.4,i.scene.add(r);let a=new oe.Group;i.scene.add(a);let o=new oe.Group;i.scene.add(o);let l=T("div",{class:"hud"}),c=T("div",{class:"badge-bad",style:{display:"none"}},"\u26A1 Ruptura diel\xE9ctrica"),h=T("div",{class:"hud"});n.append(T("div",{class:"overlay-bar"},l,c),T("div",{class:"hud-bottom"},h));let u=ht({label:"Voltaje de la bater\xEDa V",min:1,max:1e3,value:e.V,log:!0,fmt:H=>ge(H,"V",3),onInput:H=>{e.V=H,k()}}),d=ht({label:"\xC1rea de las placas A",min:5,max:Cx,value:e.A,step:1,fmt:H=>`${H.toFixed(0)} cm\xB2`,onInput:H=>{e.A=H,k()}}),f=ht({label:"Separaci\xF3n d",min:.1,max:20,value:e.d,log:!0,fmt:H=>`${H.toFixed(H<1?2:1)} mm`,onInput:H=>{e.d=H,k()}}),p=ln({label:"Material diel\xE9ctrico",options:[...Gp.map(H=>({value:H.id,label:`${H.nombre} (\u03BA = ${H.kappa})`})),{value:"custom",label:"Personalizado\u2026"}],value:e.mat,onInput:H=>{e.mat=H,x.el.style.display=H==="custom"?"":"none",k()}}),x=ht({label:"Constante diel\xE9ctrica \u03BA",min:1,max:2e3,value:e.kappa,log:!0,digits:3,onInput:H=>{e.kappa=H,k()}});x.el.style.display="none";let m=ht({label:"Inserci\xF3n del diel\xE9ctrico",min:0,max:1,step:.01,value:e.x,fmt:H=>`${(100*H).toFixed(0)} %`,onInput:H=>{e.x=H,k()}}),g=Rn([{value:"conectada",label:"Bater\xEDa conectada (V cte)"},{value:"aislada",label:"Aislado (Q cte)"}],"conectada",H=>{H==="aislada"&&(e.Qiso=I().Q),e.mode=H,u.setEnabled(H==="conectada"),k()}),y=On("Restablecer",()=>{Object.assign(e,Dc,{mode:"conectada"}),u.set(e.V),d.set(e.A),f.set(e.d),p.set(e.mat),x.set(e.kappa),m.set(e.x),g.set("conectada"),u.setEnabled(!0),x.el.style.display="none",k()},"small"),M=Vt([{key:"C",label:"Capacitancia C"},{key:"Q",label:"Carga Q"},{key:"V",label:"Voltaje V"},{key:"E",label:"Campo E = V/d"},{key:"U",label:"Energ\xEDa U = \xBDCV\xB2"},{key:"u",label:"Densidad de energ\xEDa"},{key:"sig",label:"Densidad de carga libre \u03C3"},{key:"ratio",label:"C / C\u2080 (sin diel\xE9ctrico)"}]),_=new Lt({xlabel:"separaci\xF3n d (mm)",ylabel:"C (pF)",height:210,xfmt:H=>H.toFixed(1),yfmt:H=>H.toPrecision(3)}),w=new Lt({xlabel:"inserci\xF3n del diel\xE9ctrico (%)",ylabel:"C (pF)",height:210,xfmt:H=>H.toFixed(0),yfmt:H=>H.toPrecision(3)}),E=new Lt({xlabel:"separaci\xF3n d (mm)",ylabel:"U (\xB5J)",height:210,xfmt:H=>H.toFixed(1),yfmt:H=>H.toPrecision(3)}),P=T("aside",{class:"controls"},cn("Simulador de capacitores","Var\xEDa el \xE1rea, la distancia y el diel\xE9ctrico de un capacitor de placas paralelas y observa c\xF3mo cambian C, Q, V, E y la energ\xEDa almacenada.",["Unidad 2","Diel\xE9ctricos"]),ot("Conexi\xF3n",g.el,T("p",{class:"note"},"Con la bater\xEDa conectada V es constante; al aislar el capacitor la carga Q se conserva y V var\xEDa.")),ot("Par\xE1metros",u.el,d.el,f.el,p.el,x.el,m.el,T("div",{class:"row"},y)),T("p",{class:"note"},"C = \u03BA \u03B5\u2080 A / d. Con un diel\xE9ctrico insertado una fracci\xF3n x de la longitud: C = C\u2080[1 + (\u03BA \u2212 1)x].")),b=T("div",{class:"stage scroll"},n,T("div",{class:"card"},T("h3",{},"Magnitudes del capacitor"),M.el),T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Capacitancia frente a separaci\xF3n"),_.el),T("div",{class:"card"},T("h3",{},"Capacitancia frente a inserci\xF3n"),w.el),T("div",{class:"card"},T("h3",{},"Energ\xEDa frente a separaci\xF3n"),E.el,T("p",{class:"help"},"Con V constante U \u221D 1/d (la bater\xEDa aporta energ\xEDa); con Q constante U \u221D d (hay que realizar trabajo para separar las placas)."))));s.append(T("div",{class:"mod"},P,b));let S=()=>e.mat==="custom"?{kappa:e.kappa,Emax:1/0,color:"#ff9f6b",nombre:"Personalizado"}:Gp.find(H=>H.id===e.mat);function I(H={}){let D={...e,...H},ee=S(),O=D.A*1e-4,ce=D.d*.001,q=Lc(O,ce,ee.kappa,D.x),$,Y;e.mode==="conectada"||H.forceV?($=D.V,Y=q*$):(Y=e.Qiso,$=Y/q);let ne=$/ce,le=Math.min(D.x<.999?3e6:1/0,D.x>.001?ee.Emax:1/0);return{A:O,d:ce,C:q,V:$,Q:Y,E:ne,U:.5*q*$*$,kappa:ee.kappa,EmaxEff:le,mat:ee}}let B=new oe.Group;i.scene.add(B);let G=new Di(i,{size:.24,color:7124223,spacing:.85,speed:2,maxPerLine:30}),z=new Di(i,{size:.2,color:16765773,spacing:.5,speed:1.2,maxPerLine:6}),C={Q:null,target:0,rate:0},N=null,F=H=>Math.max(4,Math.min(240,Math.round(40*H/t))),V=-1;function se(){if(i.clear(B),!N)return;let{c:H,s:D,g:ee}=N,O=F(C.Q??H.Q);V=O;let ce=-D/2,q=-D/2+e.x*D,$=H.kappa*e.x,Y=1-e.x,ne=$+Y>0?$/($+Y):0,le=Math.round(O*ne),he=O-le;e.x<=.001&&(le=0,he=O);let Ae={d:[],a:[]},re=yw(7);for(let Re=0;Re<17;Re++)for(let Q=0;Q<17;Q++){let U=-D/2+.05*D+.9*D*(Re+.2+.6*re())/17,Te=-D/2+.05*D+.9*D*(Q+.2+.6*re())/17;(U<=q&&U>=ce?Ae.d:Ae.a).push([U,Te,re()])}let ie=(Re,Q)=>Re.sort((U,Te)=>U[2]-Te[2]).slice(0,Q),pe=[...ie(Ae.d,le),...ie(Ae.a,he)],ve=new oe.SphereGeometry(.07,8,6),we=new oe.InstancedMesh(ve,new oe.MeshBasicMaterial({color:16735324}),pe.length),ke=new oe.InstancedMesh(ve,new oe.MeshBasicMaterial({color:5217791}),pe.length),Ue=new oe.Matrix4;pe.forEach(([Re,Q],U)=>{Ue.setPosition(Re,Q,ee/2-.02),we.setMatrixAt(U,Ue),Ue.setPosition(Re,Q,-ee/2+.02),ke.setMatrixAt(U,Ue)}),B.add(we,ke),i.invalidate()}i.onFrame(H=>{if(C.Q===null)return;let D=C.target-C.Q;Math.abs(D)>.001*t?(C.Q+=D*(1-Math.exp(-H/.7)),F(C.Q)!==V&&se()):C.Q=C.target;let ee=Math.abs(C.target-C.Q)/t,O=ee>.01;G.setEnabled(O),G.speed=.5+5*Math.min(1,ee);for(let q of G.lines)q.flip=D<0;let ce=N?Math.min(1,Math.log10(1+N.c.E/1e3)/4):0;z.speed=.5+2.2*ce,h.textContent=O?D>0?"Cargando: los electrones salen de la placa + hacia la bater\xEDa y llegan a la placa \u2212":"Descargando: los electrones regresan a la placa +":e.mode==="conectada"?"Equilibrio: Q = CV y ya no circula corriente":"Aislado: Q constante"});function J(H){i.clear(a);let D=6*Math.sqrt(e.A/Cx),ee=.25+.2*e.d,O=.14,ce=ye=>new oe.MeshStandardMaterial({color:ye,metalness:.55,roughness:.35,transparent:!0,opacity:.88}),q=new oe.Mesh(new oe.BoxGeometry(D,D,O),ce(12611706));q.position.z=ee/2+O/2;let $=new oe.Mesh(new oe.BoxGeometry(D,D,O),ce(7311304));if($.position.z=-ee/2-O/2,a.add(q,$),e.x>.001&&H.kappa>1.01){let ye=new oe.Mesh(new oe.BoxGeometry(D,D*.96,ee*.96),new oe.MeshPhysicalMaterial({color:new oe.Color(H.mat.color),transparent:!0,opacity:.5,roughness:.2,transmission:0,side:oe.DoubleSide,depthWrite:!1}));ye.position.x=-D/2+e.x*D-D/2,a.add(ye);let R=new oe.LineSegments(new oe.EdgesGeometry(ye.geometry),new oe.LineBasicMaterial({color:new oe.Color(H.mat.color),transparent:!0,opacity:.8}));R.position.copy(ye.position),a.add(R);let v=Zt(`\u03BA = ${+H.kappa.toPrecision(3)}`,{size:.5,color:H.mat.color});v.position.set(ye.position.x,-D/2-.2,ee/2+.7),a.add(v)}N={c:H,s:D,g:ee,t:O},se();let Y=-D/2-1.6,ne=ee/2+O/2,le=-ee/2-O/2,he=.55,Ae=[-D/2,0,ne,Y,0,ne,Y,0,he,Y,0,-he,Y,0,le,-D/2,0,le];a.add(i.fatLine([-D/2,0,ne,Y,0,ne,Y,0,he],{color:12174297,width:2.2})),a.add(i.fatLine([Y,0,-he,Y,0,le,-D/2,0,le],{color:12174297,width:2.2}));let re=new oe.Mesh(new oe.BoxGeometry(.55,.55,2*he),new oe.MeshStandardMaterial({color:5925519,metalness:.4,roughness:.5}));re.position.set(Y,0,0),a.add(re);let ie=new oe.Mesh(new oe.BoxGeometry(.28,.28,.14),new oe.MeshStandardMaterial({color:16739179}));ie.position.set(Y,0,he+.07),a.add(ie);let pe=Zt(`${ge(H.V,"V",3)}`,{size:.42,color:"#ffe066"});pe.position.set(Y-.2,0,-he-.55),a.add(pe),G.setLines([{pts:new Float32Array(Ae),flip:!1}]);let ve=[],we=4;for(let ye=0;ye<we;ye++)for(let R=0;R<we;R++){let v=-D/2+D*(ye+.5)/we,X=-D/2+D*(R+.5)/we;ve.push({pts:new Float32Array([v,X,ee/2,v,X,-ee/2]),flip:!1})}z.spacing=Math.max(.35,ee*.55),z.setLines(ve);let ke=Math.min(1,Math.log10(1+H.E/1e3)/4),Ue=new oe.Color().setHSL(.1-.1*ke,1,.55);for(let ye=0;ye<5;ye++)for(let R=0;R<5;R++){let v=-D/2+D*(ye+.5)/5,X=-D/2+D*(R+.5)/5,W=new oe.ArrowHelper(new oe.Vector3(0,0,-1),new oe.Vector3(v,X,ee*.4),ee*.8,Ue,Math.min(.3,ee*.3),Math.min(.15,ee*.15));a.add(W)}let Re=Zt("+Q",{size:.6,color:"#ff8a8a"});Re.position.set(D/2+.6,0,ee/2+O+.25);let Q=Zt("\u2212Q",{size:.6,color:"#8ab8ff"});Q.position.set(D/2+.6,0,-ee/2-O-.25),a.add(Re,Q);let U=i.fatLine([D/2+.2,-D/2,-ee/2,D/2+.2,-D/2,ee/2],{color:16777215,width:2});a.add(U);let Te=Zt(`d = ${e.d.toFixed(e.d<1?2:1)} mm`,{size:.45});Te.position.set(D/2+.3,-D/2-.9,0),a.add(Te),q.material.color.set(H.E>H.EmaxEff?16731469:12611706),i.invalidate(),J.g=ee,J.s=D}let Z=!1;i.onFrame((H,D)=>{if(!Z){o.children.length&&i.clear(o);return}if(Math.floor(D*14)===J.lastTick)return;J.lastTick=Math.floor(D*14),i.clear(o);let{g:ee,s:O}=J;for(let ce=0;ce<3;ce++){let q=[],$=(Math.random()-.5)*O*.8,Y=(Math.random()-.5)*O*.8;for(let ne=0;ne<=8;ne++)q.push($+(Math.random()-.5)*.5,Y+(Math.random()-.5)*.5,ee/2-ee*ne/8);o.add(i.fatLine(q,{color:16773280,width:3}))}i.invalidate()});function k(){let H=I();Z=H.E>H.EmaxEff,c.style.display=Z?"":"none",e.mode==="aislada"&&u.set(Math.min(1e3,Math.max(1,H.V)));let D=Ic*H.A/H.d;M.update({C:[ge(H.C,"F"),`C\u2080 = ${ge(D,"F")}`],Q:[ge(H.Q,"C"),e.mode==="aislada"?"constante (aislado)":"Q = C V"],V:[ge(H.V,"V"),e.mode==="aislada"?"var\xEDa: V = Q / C":"fijado por la bater\xEDa"],E:[ge(H.E,"V/m"),isFinite(H.EmaxEff)?`l\xEDmite ${ge(H.EmaxEff,"V/m")}`:"sin l\xEDmite",Z?"bad":""],U:[ge(H.U,"J"),""],u:[ge(H.U/(H.A*H.d),"J/m\xB3"),"\xBD \u03B5 E\xB2"],sig:[ge(H.Q/H.A,"C/m\xB2"),""],ratio:[(H.C/D).toFixed(3),"efecto del diel\xE9ctrico"]}),l.textContent=`A = ${e.A.toFixed(0)} cm\xB2 \xB7 d = ${e.d.toFixed(2)} mm \xB7 ${H.mat.nombre} \xB7 ${e.mode==="conectada"?"bater\xEDa conectada":"aislado"}`,C.target=H.Q,C.Q===null&&(C.Q=H.Q),J(H);let ee=[],O=[],ce=[],q=[];for(let ne=0;ne<=100;ne++){let le=.2+19.8*(ne/100);ee.push(le);let he=Lc(H.A*1e4*1e-4,le*.001,H.kappa,e.x);O.push(he*1e12),ce.push(.5*he*H.V*H.V*1e6),q.push(H.Q*H.Q/(2*he)*1e6)}_.set({series:[{x:ee,y:O,label:"C(d)"}],markers:[{x:e.d,y:H.C*1e12,color:"#fff",label:"actual"}]});let $=[],Y=[];for(let ne=0;ne<=100;ne++)$.push(ne),Y.push(Lc(H.A,H.d,H.kappa,ne/100)*1e12);w.set({series:[{x:$,y:Y,label:"C(x)",color:"#ff9f6b"}],markers:[{x:e.x*100,y:H.C*1e12,color:"#fff",label:"actual"}]}),E.set({series:[{x:ee,y:ce,label:"V constante"},{x:ee,y:q,label:"Q constante",color:"#ff9f6b"}],markers:[{x:e.d,y:H.U*1e6,color:"#fff",label:"actual"}]})}return k(),{destroy(){_.destroy(),w.destroy(),E.destroy(),G.dispose(),z.dispose(),i.dispose()}}}};var to={C:[["pF",1e-12],["nF",1e-9],["\xB5F",1e-6],["mF",.001],["F",1]],V:[["mV",.001],["V",1],["kV",1e3]],Q:[["pC",1e-12],["nC",1e-9],["\xB5C",1e-6],["mC",.001],["C",1]],R:[["\u03A9",1],["k\u03A9",1e3],["M\u03A9",1e6]]};function Ps(s,e,t,n,i){let r=T("input",{type:"number",value:t,step:"any",min:0}),a=T("select",{style:{width:"78px",flex:"none"}},to[e].map(([l],c)=>T("option",{value:c,selected:c===n},l))),o=()=>i&&i();return r.addEventListener("input",o),a.addEventListener("input",o),{el:T("label",{class:"field"},T("span",{class:"lbl"},T("span",{},s)),T("div",{class:"row"},r,a)),get:()=>parseFloat(r.value)*to[e][parseInt(a.value,10)][1],set:l=>{let c=to[e].length-1;for(let h=0;h<to[e].length;h++)if(l/to[e][h][1]<1e3){c=h;break}a.value=c,r.value=+(l/to[e][c][1]).toPrecision(4)},el2:{inp:r,sel:a}}}var Px={id:"energia",unidad:2,icono:"U",titulo:"Energ\xEDa almacenada",corto:"U = \xBDCV\xB2, redes y circuito RC",mount(s){let e="CV",t=Ps("Capacitancia C","C",100,2,c),n=Ps("Voltaje V","V",12,1,c),i=Ps("Carga Q","Q",1200,2,c),r=ln({label:"Datos conocidos",value:"CV",options:[{value:"CV",label:"Capacitancia y voltaje (C, V)"},{value:"CQ",label:"Capacitancia y carga (C, Q)"},{value:"VQ",label:"Voltaje y carga (V, Q)"}],onInput:N=>{e=N,l(),c()}}),a=Vt([{key:"C",label:"Capacitancia C"},{key:"V",label:"Voltaje V"},{key:"Q",label:"Carga Q"},{key:"U",label:"Energ\xEDa U"},{key:"eq",label:"Equivale a levantar 1 kg"},{key:"P",label:"Potencia si se descarga en 1 ms"}]),o=new Lt({xlabel:"voltaje V (V)",ylabel:"U (J)",height:230,xfmt:N=>N.toPrecision(3),yfmt:N=>ge(N,"J",2),yZero:!0}),l=()=>{t.el.style.display=e.includes("C")?"":"none",n.el.style.display=e.includes("V")?"":"none",i.el.style.display=e.includes("Q")?"":"none"};function c(){try{let N={};if(e.includes("C")&&(N.C=t.get()),e.includes("V")&&(N.V=n.get()),e.includes("Q")&&(N.Q=i.get()),Object.values(N).some(J=>!isFinite(J)||J<=0))throw new Error("valor no v\xE1lido");let F=wx(N);a.update({C:[ge(F.C,"F"),""],V:[ge(F.V,"V"),""],Q:[ge(F.Q,"C"),""],U:[ge(F.U,"J"),"\xBDCV\xB2 = \xBDQV = Q\xB2/2C"],eq:[`h = ${ge(F.U/9.81,"m")}`,"U = m g h"],P:[ge(F.U/.001,"W"),"P = U / \u0394t"]});let V=[],se=[];for(let J=0;J<=100;J++){let Z=F.V*1.6*J/100;V.push(Z),se.push(.5*F.C*Z*Z)}o.set({series:[{x:V,y:se,label:`U = \xBD C V\xB2  (C = ${ge(F.C,"F",3)})`}],markers:[{x:F.V,y:F.U,color:"#fff",label:`${ge(F.U,"J",3)}`}]})}catch{a.update({C:["\u2014"],V:["\u2014"],Q:["\u2014"],U:["\u2014"],eq:["\u2014"],P:["\u2014"]})}}let h={topo:"serie",V:12,caps:[{C:1e-5},{C:22e-6},{C:47e-6}]},u=T("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),d=Ps("Voltaje aplicado","V",12,1,()=>{h.V=d.get(),y()}),f=Rn([{value:"serie",label:"Serie"},{value:"paralelo",label:"Paralelo"}],"serie",N=>{h.topo=N,y()}),p=Vt([{key:"Ceq",label:"Capacitancia equivalente"},{key:"Q",label:"Carga total"},{key:"U",label:"Energ\xEDa total"},{key:"chk",label:"\u03A3 U\u1D62 = U total"}]),x=T("tbody"),m=On("+ A\xF1adir capacitor",()=>{h.caps.length<6&&(h.caps.push({C:1e-5}),g(),y())},"small");function g(){u.replaceChildren(...h.caps.map((N,F)=>{let V=Ps(`C${F+1}`,"C",0,2,()=>{N.C=V.get(),y()});return V.set(N.C),T("div",{class:"row"},T("div",{class:"grow"},V.el),T("button",{class:"btn small danger",style:{marginTop:"18px"},onclick:()=>{h.caps.length>1&&(h.caps.splice(F,1),g(),y())}},"\u2715"))})),m.disabled=h.caps.length>=6}function y(){let N=h.caps.map(se=>se.C);if(N.some(se=>!isFinite(se)||se<=0)||!isFinite(h.V))return;let F=Ex(N,h.V,h.topo),V=F.items.reduce((se,J)=>se+J.U,0);p.update({Ceq:[ge(F.Ceq,"F"),h.topo==="serie"?"1/Ceq = \u03A3 1/C\u1D62":"Ceq = \u03A3 C\u1D62"],Q:[ge(F.Q,"C"),h.topo==="serie"?"misma Q en todos":"Q = \u03A3 Q\u1D62"],U:[ge(F.U,"J"),"\xBD Ceq V\xB2"],chk:[`${(V/F.U*100).toFixed(4)} %`,"conservaci\xF3n de energ\xEDa",Math.abs(V/F.U-1)<1e-9?"good":"bad"]}),x.replaceChildren(...F.items.map((se,J)=>T("tr",{},T("td",{},`C${J+1}`),T("td",{},ge(se.C,"F")),T("td",{},ge(se.Q,"C")),T("td",{},ge(se.V,"V")),T("td",{},ge(se.U,"J")),T("td",{},`${(100*se.U/F.U).toFixed(1)} %`))))}let M={mode:"carga",R:1e3,C:1e-4,V:12,frac:1},_=Ps("Resistencia R","R",1,1,z),w=Ps("Capacitancia C","C",100,2,z),E=Ps("Voltaje V","V",12,1,z),P=Rn([{value:"carga",label:"Carga"},{value:"descarga",label:"Descarga"}],"carga",N=>{M.mode=N,z()}),b=T("input",{type:"range",min:0,max:1e3,value:300,style:{width:"100%"}});b.addEventListener("input",()=>{M.frac=b.value/1e3,z()});let S=Vt([{key:"tau",label:"Constante de tiempo \u03C4 = RC"},{key:"vc",label:"v_C(t)"},{key:"i",label:"i(t)"},{key:"uc",label:"Energ\xEDa en C"},{key:"er",label:"Energ\xEDa disipada en R"},{key:"eb",label:"Energ\xEDa de la fuente"}]),I=new Lt({xlabel:"t",ylabel:"v_C (V)",height:210,xfmt:N=>ge(N,"s",2),yfmt:N=>ge(N,"V",2)}),B=new Lt({xlabel:"t",ylabel:"i (A)",height:210,xfmt:N=>ge(N,"s",2),yfmt:N=>ge(N,"A",2),yZero:!1}),G=new Lt({xlabel:"t",ylabel:"energ\xEDa (J)",height:210,xfmt:N=>ge(N,"s",2),yfmt:N=>ge(N,"J",2)});function z(){if(M.R=_.get(),M.C=w.get(),M.V=E.get(),![M.R,M.C,M.V].every(he=>isFinite(he)&&he>0))return;let N=M.R*M.C,F=6*N,V=240,se=M.mode==="carga"?he=>Tx(M.V,M.R,M.C,he):he=>Ax(M.V,M.R,M.C,he),J=[],Z=[],k=[],H=[],D=[],ee=[],O=0,ce=0;for(let he=0;he<=V;he++){let Ae=F*he/V,re=se(Ae);O+=re.i*re.i*M.R*(Ae-ce),ce=Ae,J.push(Ae),Z.push(re.vc),k.push(re.i),H.push(re.uC),D.push(O),ee.push(M.mode==="carga"?M.V*M.C*re.vc:0)}let q=M.frac*F,$=se(q),Y=Math.round(M.frac*V),ne=[{x:q,color:"#fbbf24",label:`t = ${ge(q,"s",2)}`}];I.set({series:[{x:J,y:Z,label:"v_C"}],vlines:ne,markers:[{x:q,y:$.vc,color:"#fff"}]}),B.set({series:[{x:J,y:k,label:"i",color:"#ff9f6b"}],vlines:ne,markers:[{x:q,y:$.i,color:"#fff"}]});let le=[{x:J,y:H,label:"Energ\xEDa en C"},{x:J,y:D,label:"Disipada en R",color:"#ff9f6b"}];M.mode==="carga"&&le.push({x:J,y:ee,label:"Entregada por la fuente",color:"#7ae582",dash:[6,4]}),G.set({series:le,vlines:ne}),S.update({tau:[ge(N,"s"),`99 % en \u2248 ${ge(4.6*N,"s",2)}`],vc:[ge($.vc,"V"),`${($.vc/M.V*100).toFixed(1)} % de V`],i:[ge($.i,"A"),`I\u2080 = V/R = ${ge(M.V/M.R,"A",3)}`],uc:[ge($.uC,"J"),`final ${ge(.5*M.C*M.V*M.V,"J",3)}`],er:[ge(D[Y],"J"),M.mode==="carga"?"total \u2192 \xBDCV\xB2 (la mitad)":"total \u2192 \xBDCV\xB2 (toda la energ\xEDa)"],eb:[M.mode==="carga"?ge(ee[Y],"J"):"\u2014",M.mode==="carga"?"total \u2192 CV\xB2":"sin fuente"]})}l(),c(),g(),y(),z();let C=T("div",{class:"stage scroll",style:{flex:1}},T("div",{class:"mod-title"},T("div",{},T("span",{class:"tag"},"Unidad 2"),T("span",{class:"tag"},"Calculadora")),T("h2",{style:{marginTop:"6px"}},"Calculadora de energ\xEDa almacenada"),T("p",{},"La energ\xEDa de un capacitor es el trabajo necesario para cargarlo: U = \xBD C V\xB2 = \xBD Q V = Q\xB2 / (2C).")),T("div",{class:"card"},T("h3",{},"A \xB7 Energ\xEDa de un capacitor"),T("div",{class:"grid-2"},T("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},r.el,t.el,n.el,i.el,a.el),o.el)),T("div",{class:"card"},T("h3",{},"B \xB7 Capacitores en serie y en paralelo"),T("div",{class:"grid-2"},T("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},T("div",{class:"row wrap"},f.el,m),d.el,u),T("div",{style:{display:"flex",flexDirection:"column",gap:"10px",minWidth:0}},p.el,T("table",{class:"tbl"},T("thead",{},T("tr",{},["","C","Q","V","U","% de U"].map(N=>T("th",{},N)))),x)))),T("div",{class:"card"},T("h3",{},"C \xB7 Carga y descarga de un capacitor a trav\xE9s de una resistencia (circuito RC)"),T("div",{class:"grid-2"},T("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},P.el,_.el,w.el,E.el,T("label",{class:"field"},T("span",{class:"lbl"},T("span",{},"Instante de observaci\xF3n (0 \u2026 6\u03C4)")),b),S.el),G.el),T("div",{class:"grid-2"},I.el,B.el),T("p",{class:"help"},"v_C(t) = V (1 \u2212 e^(\u2212t/RC)) al cargar; v_C(t) = V e^(\u2212t/RC) al descargar. Al cargar, la fuente entrega C V\xB2: la mitad queda almacenada y la otra mitad se disipa en R, sin importar el valor de R.")));return s.append(T("div",{class:"mod"},C)),{destroy(){o.destroy(),I.destroy(),B.destroy(),G.destroy()}}}};var vw=1,Hp=()=>`n${vw++}`,Tt=(s,e)=>({type:"R",id:Hp(),R:s,name:e}),es=(...s)=>({type:"S",id:Hp(),children:s}),Mr=(...s)=>({type:"P",id:Hp(),children:s});function Uc(s){if(s.type==="R")return s.R;let e=s.children.map(Uc);return s.type==="S"?e.reduce((t,n)=>t+n,0):1/e.reduce((t,n)=>t+1/n,0)}function Ix(s,e){let t=Uc(s),n=e/t,i=(a,o,l)=>{let c=Uc(a),h={...a,Req:c,I:l,V:o,P:o*l};return a.type==="S"?h.children=a.children.map(u=>{let d=Uc(u);return i(u,l*d,l)}):a.type==="P"&&(h.children=a.children.map(u=>{let d=Uc(u);return i(u,o,o/d)})),h};return{tree:i(s,e,n),Req:t,I:n,V:e,P:e*n}}function Md(s,e=[]){return s.type==="R"?e.push(s):s.children.forEach(t=>Md(t,e)),e}function Lx(s){return Md(s).reduce((e,t)=>e+t.I*t.I*t.R,0)}function Wp(s,e=new Map){return s.type==="R"?e.get(s.id)||s.name||"R":s.children.map(n=>{let i=Wp(n,e);return n.type==="R"?i:`(${i})`}).join(s.type==="S"?" + ":" \u2225 ")}function Dx(s){let e=new Map,t=1,n=i=>{i.type==="R"?e.set(i.id,`R${t++}`):i.children.forEach(n)};return n(s),e}var Xp={serie:{nombre:"Serie: R\u2081 + R\u2082 + R\u2083",make:()=>es(Tt(100),Tt(220),Tt(330))},paralelo:{nombre:"Paralelo: R\u2081 \u2225 R\u2082 \u2225 R\u2083",make:()=>Mr(Tt(100),Tt(220),Tt(330))},mixto1:{nombre:"Mixto: R\u2081 + (R\u2082 \u2225 R\u2083) + R\u2084",make:()=>es(Tt(100),Mr(Tt(220),Tt(330)),Tt(47))},mixto2:{nombre:"Mixto: (R\u2081+R\u2082) \u2225 (R\u2083+R\u2084), luego + R\u2085",make:()=>es(Mr(es(Tt(100),Tt(220)),es(Tt(330),Tt(150))),Tt(68))},mixto3:{nombre:"Mixto anidado: R\u2081 + (R\u2082 \u2225 (R\u2083 + (R\u2084 \u2225 R\u2085)))",make:()=>es(Tt(47),Mr(Tt(220),es(Tt(100),Mr(Tt(330),Tt(150)))))}},Ux={id:"circuitos",unidad:3,icono:"\u03A9",titulo:"Simulador de circuitos",corto:"Serie, paralelo y mixto",mount(s){let e={root:Xp.mixto1.make(),V:12},t=T("div",{class:"tree"}),n=()=>Dx(e.root);function i(_,w,E){if(_.type==="R"){let b=T("input",{type:"number",value:_.R,min:.001,step:"any",style:{width:"90px"}});return b.addEventListener("input",()=>{let S=parseFloat(b.value);isFinite(S)&&S>0&&(_.R=S,x(!1))}),T("div",{class:"row tnode",style:{padding:"5px 8px"}},T("b",{style:{width:"30px"}},E.get(_.id)),b,T("span",{class:"note"},"\u03A9"),T("div",{class:"grow"}),w?T("button",{class:"btn small danger",title:"Quitar",onclick:()=>{w.children=w.children.filter(S=>S!==_),x(!0)}},"\u2715"):null)}let P=_.type==="S";return T("div",{class:`tnode ${_.type}`},T("div",{class:"thead"},T("b",{},P?"Serie":"Paralelo"),T("span",{class:"note"},`(${_.children.length})`),T("div",{class:"grow"}),T("button",{class:"btn small",title:"A\xF1adir resistor",onclick:()=>{_.children.push(Tt(100)),x(!0)}},"+ R"),T("button",{class:"btn small",title:"A\xF1adir grupo en serie",onclick:()=>{_.children.push(es(Tt(100),Tt(100))),x(!0)}},"+ Serie"),T("button",{class:"btn small",title:"A\xF1adir grupo en paralelo",onclick:()=>{_.children.push(Mr(Tt(100),Tt(100))),x(!0)}},"+ Par."),T("button",{class:"btn small",title:"Cambiar serie \u21C4 paralelo",onclick:()=>{_.type=P?"P":"S",x(!0)}},"\u21C4"),w?T("button",{class:"btn small danger",title:"Quitar grupo",onclick:()=>{w.children=w.children.filter(b=>b!==_),x(!0)}},"\u2715"):null),T("div",{class:"tkids"},_.children.map(b=>i(b,_,E))))}let r=T("div",{class:"schem"}),a=118,o=64,l=_=>{if(_.type==="R")return{w:a,up:30,down:36};let w=_.children.map(l);if(_.type==="S")return{w:w.reduce((P,b)=>P+b.w,0),up:Math.max(...w.map(P=>P.up)),down:Math.max(...w.map(P=>P.down))};let E=w.reduce((P,b)=>P+b.up+b.down,0)+10*(w.length-1);return{w:Math.max(...w.map(P=>P.w))+56,up:w[0].up,down:E-w[0].up}};function c(_,w){let E=_.I,P=[],b=(se,J)=>{if(P.push(bi("path",{d:se,fill:"none",stroke:"#51648a","stroke-width":2.2,"stroke-linecap":"round"})),J>0){let Z=Math.min(8,Math.max(.5,1.2*E/J));P.push(bi("path",{d:se,fill:"none",stroke:"#ffe066","stroke-width":3,"stroke-linecap":"round",class:"flow",style:{animationDuration:`${Z}s`}}))}},S=(se,J,Z,k={})=>P.push(bi("text",{x:se,y:J,"text-anchor":"middle","font-size":12,fill:k.fill||"var(--text)","font-family":"var(--mono)","font-weight":k.bold?700:400},Z)),I=(se,J,Z)=>{let k=l(se);if(se.type==="R"){let $=J+a/2,Y=$-o/2,ne=$+o/2;b(`M ${J} ${Z} L ${Y} ${Z}`,se.I),b(`M ${ne} ${Z} L ${J+a} ${Z}`,se.I);let le=[],he=6;for(let Ae=0;Ae<=he;Ae++)le.push(`${Y+(ne-Y)*Ae/he},${Z+(Ae===0||Ae===he?0:Ae%2?-9:9)}`);P.push(bi("polyline",{points:le.join(" "),fill:"none",stroke:"#9cc3ff","stroke-width":2.6,"stroke-linejoin":"round"})),S($,Z-20,`${w.get(se.id)} = ${ge(se.R,"\u03A9",3)}`,{bold:!0}),S($,Z+22,`${ge(se.I,"A",3)}`,{fill:"#ffe066"}),S($,Z+35,`${ge(se.V,"V",3)}`,{fill:"#7ae582"});return}if(se.type==="S"){let $=J;se.children.forEach(Y=>{I(Y,$,Z),$+=l(Y).w});return}let H=28,D=J+10,ee=J+k.w-10,O=Z,ce=[];se.children.forEach(($,Y)=>{let ne=l($);Y>0&&(O+=l(se.children[Y-1]).down+10+ne.up),ce.push(O);let le=(k.w-2*H-ne.w)/2;Y===0?(b(`M ${J} ${Z} L ${J+H+le} ${Z}`,$.I),b(`M ${J+H+le+ne.w} ${Z} L ${J+k.w} ${Z}`,$.I)):(b(`M ${D} ${O} L ${J+H+le} ${O}`,$.I),b(`M ${J+H+le+ne.w} ${O} L ${ee} ${O}`,$.I)),I($,J+H+le,O)});let q=ce[ce.length-1];b(`M ${D} ${Z} L ${D} ${q}`,0),b(`M ${ee} ${Z} L ${ee} ${q}`,0),P.push(bi("circle",{cx:D,cy:Z,r:3.2,fill:"#9cc3ff"}),bi("circle",{cx:ee,cy:Z,r:3.2,fill:"#9cc3ff"}))},B=l(_.tree),G=124,z=36+B.up,C=z+B.down+56,N=G+B.w+60,F=C+40;b(`M ${G-40} ${z} L ${G} ${z}`,E),I(_.tree,G,z),b(`M ${G+B.w} ${z} L ${G+B.w+30} ${z} L ${G+B.w+30} ${C} L ${G-40} ${C}`,E),b(`M ${G-40} ${C} L ${G-40} ${(z+C)/2+12}`,E),b(`M ${G-40} ${(z+C)/2-12} L ${G-40} ${z}`,E);let V=(z+C)/2;return P.push(bi("line",{x1:G-58,y1:V-12,x2:G-22,y2:V-12,stroke:"#ff8a8a","stroke-width":3.5})),P.push(bi("line",{x1:G-50,y1:V+12,x2:G-30,y2:V+12,stroke:"#8ab8ff","stroke-width":3.5})),S(G-62,V-16,"+",{fill:"#ff8a8a",bold:!0}),S(G-62,V+22,"\u2212",{fill:"#8ab8ff",bold:!0}),S(G-96,V+4,`${ge(_.V,"V",3)}`,{bold:!0}),bi("svg",{viewBox:`0 0 ${N} ${F}`,role:"img","aria-label":"Esquema del circuito",style:{minWidth:`${Math.min(N,520)}px`}},...P)}let h=Vt([{key:"Req",label:"Resistencia equivalente"},{key:"I",label:"Corriente de la fuente"},{key:"P",label:"Potencia entregada"},{key:"bal",label:"Balance de potencia"}]),u=T("div",{class:"formula"}),d=T("tbody"),f=T("tfoot");function p(_){_.type!=="R"&&(_.children.forEach(p),_.children=_.children.filter(w=>w.type==="R"||w.children.length>0))}function x(_){p(e.root),e.root.children.length||e.root.children.push(Tt(100));let w=n();_&&t.replaceChildren(i(e.root,null,w));let E=Ix(e.root,e.V),P=Md(E.tree),b=Lx(E.tree);h.update({Req:[ge(E.Req,"\u03A9",4),""],I:[ge(E.I,"A",4),"I = V / Req"],P:[ge(E.P,"W",4),"P = V I"],bal:[`${(b/E.P*100).toFixed(4)} %`,"\u03A3 I\xB2R / (V I)",Math.abs(b/E.P-1)<1e-9?"good":"bad"]}),u.textContent=`Req = ${Wp(e.root,w)} = ${ge(E.Req,"\u03A9",4)}`,d.replaceChildren(...P.map(S=>T("tr",{},T("td",{},w.get(S.id)),T("td",{},ge(S.R,"\u03A9")),T("td",{},ge(S.V,"V")),T("td",{},ge(S.I,"A")),T("td",{},ge(S.I*S.I*S.R,"W")),T("td",{},`${(100*S.I*S.I*S.R/E.P).toFixed(1)} %`)))),r.replaceChildren(c(E,w))}let m=Jt({label:"Voltaje de la fuente (V)",value:e.V,step:.5,min:.1,onInput:_=>{_>0&&(e.V=_,x(!1))}}),g=ln({label:"Circuitos de ejemplo",options:[{value:"",label:"Cargar un ejemplo\u2026"},...Object.entries(Xp).map(([_,w])=>({value:_,label:w.nombre}))],onInput:_=>{_&&(e.root=Xp[_].make(),x(!0)),g.set("")}}),y=T("aside",{class:"controls"},cn("Simulador de circuitos","Arma circuitos con resistencias en serie, en paralelo o mixtos. El simulador calcula la corriente, el voltaje y la potencia de cada resistor.",["Unidad 3","Leyes de Kirchhoff"]),ot("Ejemplos",g.el),ot("Fuente",m.el),ot("Construcci\xF3n del circuito",t,T("p",{class:"note"},"Cada grupo es una conexi\xF3n en serie (misma corriente) o en paralelo (mismo voltaje). Anida grupos con \xAB+ Serie\xBB y \xAB+ Par.\xBB."))),M=T("div",{class:"stage scroll"},T("div",{class:"card"},T("h3",{},"Esquema del circuito"),T("div",{class:"legend"},T("span",{},T("i",{style:{background:"#ffe066"}}),"corriente (A)"),T("span",{},T("i",{style:{background:"#7ae582"}}),"voltaje en el resistor (V)"),T("span",{},"Las part\xEDculas amarillas indican el sentido convencional de la corriente; su velocidad es proporcional a la corriente de cada rama.")),r,u),T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Resumen"),h.el),T("div",{class:"card"},T("h3",{},"Tabla por resistor"),T("table",{class:"tbl"},T("thead",{},T("tr",{},["","R","V","I","P","% de P"].map(_=>T("th",{},_)))),d))),T("div",{class:"card"},T("h3",{},"C\xF3mo se resuelve"),T("p",{class:"help"},"1) Se reduce el circuito de adentro hacia afuera: serie \u2192 R = \u03A3R\u1D62 ; paralelo \u2192 1/R = \u03A3 1/R\u1D62.  2) Con Req se obtiene I = V/Req.  3) Se reparte hacia adentro: en serie la corriente es com\xFAn y V se divide (V\u1D62 = I R\u1D62); en paralelo el voltaje es com\xFAn y la corriente se divide (I\u1D62 = V/R\u1D62).  4) Se verifica la conservaci\xF3n de la energ\xEDa: la potencia entregada por la fuente es igual a la suma de I\xB2R.")));return s.append(T("div",{class:"mod"},y,M)),x(!0),{}}};var Nx={id:"ohm",unidad:3,icono:"I",titulo:"Ley de Ohm",corto:"Relaci\xF3n V \u2013 I \u2013 R en tiempo real",mount(s){let e={mode:"I",V:9,R:120,I:.075,auto:!1,freq:.25,t0:performance.now()},t={t:[],V:[],I:[],P:[]},n=ht({label:"Voltaje V",min:0,max:24,step:.1,value:e.V,fmt:C=>ge(C,"V",3),onInput:C=>{e.V=C,u("V")}}),i=ht({label:"Resistencia R",min:1,max:1e3,value:e.R,log:!0,fmt:C=>ge(C,"\u03A9",3),onInput:C=>{e.R=C,u("R")}}),r=ht({label:"Corriente I",min:.001,max:5,value:e.I,log:!0,fmt:C=>ge(C,"A",3),onInput:C=>{e.I=C,u("I")}}),a=Rn([{value:"I",label:"Hallar I"},{value:"V",label:"Hallar V"},{value:"R",label:"Hallar R"}],"I",C=>{e.mode=C,h(),u()}),o=zt({label:"Barrido autom\xE1tico de V (senoidal)",value:!1,onInput:C=>{e.auto=C,C||n.set(e.V)}}),l=ht({label:"Frecuencia del barrido",min:.05,max:1,step:.05,value:e.freq,fmt:C=>`${C.toFixed(2)} Hz`,onInput:C=>{e.freq=C}}),c=Vt([{key:"V",label:"Voltaje V"},{key:"I",label:"Corriente I"},{key:"R",label:"Resistencia R"},{key:"P",label:"Potencia P = V\xB7I"}]);function h(){n.setEnabled(e.mode!=="V"),i.setEnabled(e.mode!=="R"),r.setEnabled(e.mode!=="I"),o.input.disabled=e.mode!=="I",e.mode!=="I"&&(e.auto=!1,o.set(!1))}function u(C){e.mode==="I"?(e.I=e.R>0?e.V/e.R:0,r.set(Math.max(e.I,.001))):e.mode==="V"?(e.V=e.I*e.R,n.set(Math.min(24,e.V))):(e.R=e.I>0?e.V/e.I:1/0,i.set(Math.min(1e3,Math.max(1,e.R)))),d()}function d(){let C=e.V*e.I;c.update({V:[ge(e.V,"V",4),e.mode==="V"?"V = I R":""],I:[ge(e.I,"A",4),e.mode==="I"?"I = V / R":""],R:[isFinite(e.R)?ge(e.R,"\u03A9",4):"\u221E",e.mode==="R"?"R = V / I":""],P:[ge(C,"W",4),C>100?"\u26A0 potencia elevada":"P = V I = I\xB2R = V\xB2/R",C>100?"warn":""]}),w()}let f=T("aside",{class:"controls"},cn("Visualizador de la ley de Ohm","Mueve dos de las tres magnitudes y la tercera se calcula en tiempo real: V = I\xB7R. Observa el flujo de electrones, la recta I\u2013V y la potencia disipada.",["Unidad 3","Tiempo real"]),ot("\xBFQu\xE9 magnitud quieres calcular?",a.el),ot("Magnitudes",n.el,i.el,r.el),ot("Modo din\xE1mico",o.el,l.el,T("p",{class:"note"},"Con el barrido, V oscila entre 0 y el valor del deslizador de voltaje y puedes ver c\xF3mo I lo sigue sin retraso (resistor \xF3hmico).")),T("div",{class:"formula"},"V = I \xB7 R     P = V \xB7 I = I\xB2 R = V\xB2 / R")),p=T("canvas",{style:{width:"100%",height:"260px",display:"block",background:"var(--bg)",border:"1px solid var(--line)",borderRadius:"10px"}}),x=new Lt({xlabel:"V (V)",ylabel:"I (A)",height:250,xfmt:C=>C.toPrecision(2),yfmt:C=>ge(C,"A",2)}),m=new Lt({xlabel:"R (\u03A9)",ylabel:"I (A) con V constante",height:250,xfmt:C=>C.toFixed(0),yfmt:C=>ge(C,"A",2)}),g=new Lt({xlabel:"",ylabel:"V (V)",height:110,xfmt:C=>`${C.toFixed(1)} s`,yfmt:C=>C.toPrecision(3),yZero:!0}),y=new Lt({xlabel:"",ylabel:"I (mA)",height:110,xfmt:C=>`${C.toFixed(1)} s`,yfmt:C=>C.toPrecision(3),yZero:!0}),M=new Lt({xlabel:"tiempo (s)",ylabel:"P (W)",height:130,xfmt:C=>`${C.toFixed(1)} s`,yfmt:C=>C.toPrecision(3),yZero:!0}),_=T("div",{class:"stage scroll"},T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Circuito en funcionamiento"),p,T("div",{class:"legend"},T("span",{},T("i",{style:{background:"#6cb4ff"}}),"electrones (sentido real)"),T("span",{},"La corriente convencional va de + a \u2212 por el circuito externo.")),c.el),T("div",{class:"card"},T("h3",{},"Caracter\xEDstica I \u2013 V"),x.el,T("p",{class:"help"},"La pendiente de la recta es 1/R: a mayor resistencia, menor corriente para el mismo voltaje. Las l\xEDneas tenues corresponden a R/2 y 2R."))),T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"I frente a R (V constante)"),m.el,T("p",{class:"help"},"I = V/R es una hip\xE9rbola: duplicar R reduce la corriente a la mitad.")),T("div",{class:"card"},T("h3",{},"Historial (\xFAltimos 12 s)"),g.el,y.el,M.el)));s.append(T("div",{class:"mod"},f,_));function w(){let C=Math.max(24,e.V*1.1),N=Z=>({x:[0,C],y:[0,C/Z]}),F=(isFinite(e.R)?[e.R/2,e.R*2]:[]).map(Z=>({...N(Z),color:"#3a4d70",width:1.5,dash:[4,4]})),V={x:[0,C],y:[0,isFinite(e.R)?C/e.R:0],label:`R = ${ge(e.R,"\u03A9",3)}`,color:"#4cc2ff",width:2.6};x.set({series:[...F,V],markers:[{x:e.V,y:e.I,color:"#ffe066",label:`${ge(e.V,"V",3)}, ${ge(e.I,"A",3)}`}]});let se=[],J=[];for(let Z=0;Z<=200;Z++){let k=5+995*Z/200;se.push(k),J.push(e.V/k)}m.set({series:[{x:se,y:J,label:`V = ${ge(e.V,"V",3)}`,color:"#ff9f6b"}],markers:isFinite(e.R)?[{x:e.R,y:e.I,color:"#ffe066"}]:[]})}let E=0;function P(C){if(C-E<100)return;E=C;let N=(C-e.t0)/1e3;for(t.t.push(N),t.V.push(e.V),t.I.push(e.I*1e3),t.P.push(e.V*e.I);t.t.length&&N-t.t[0]>12;)for(let V of["t","V","I","P"])t[V].shift();let F=t.t;g.set({series:[{x:F,y:t.V,color:"#7ae582"}]}),y.set({series:[{x:F,y:t.I,color:"#ffe066"}]}),M.set({series:[{x:F,y:t.P,color:"#ff7a7a"}]})}let b=0,S=0,I=performance.now(),B=44;function G(C){b=requestAnimationFrame(G);let N=Math.min(.05,(C-I)/1e3);if(I=C,e.auto&&e.mode==="I"){let V=n.get();e.V=V*(.5+.5*Math.sin(2*Math.PI*e.freq*((C-e.t0)/1e3))),e.I=e.V/e.R,d()}let F=.02+.55*(Math.log10(1+40*e.I)/Math.log10(201));S=(S+N*F)%1,z(),P(C)}function z(){let C=window.devicePixelRatio||1,N=p.clientWidth,F=p.clientHeight;if(!N)return;p.width!==Math.round(N*C)&&(p.width=Math.round(N*C),p.height=Math.round(F*C));let V=p.getContext("2d");V.setTransform(C,0,0,C,0,0),V.clearRect(0,0,N,F);let se=Math.max(60,N*.12),J=38,Z=se,k=N-se,H=J,D=F-J,ee=2*(k-Z)+2*(D-H);V.lineWidth=3,V.strokeStyle="#51648a",V.lineJoin="round";let O=(H+D)/2,ce=(Y,ne,le,he)=>{V.beginPath(),V.moveTo(Y,ne),V.lineTo(le,he),V.stroke()};ce(Z,H,k,H),ce(k,H,k,O-34),ce(k,O+34,k,D),ce(k,D,Z,D),ce(Z,D,Z,O+18),ce(Z,O-18,Z,H),V.strokeStyle="#ff8a8a",V.lineWidth=4,ce(Z-20,O-14,Z+20,O-14),V.strokeStyle="#8ab8ff",ce(Z-11,O+14,Z+11,O+14),V.fillStyle="#ff8a8a",V.font="bold 14px sans-serif",V.textAlign="center",V.fillText("+",Z-30,O-10),V.fillStyle="#8ab8ff",V.fillText("\u2212",Z-30,O+20),V.fillStyle="#e6ebf5",V.font='600 13px "Segoe UI", sans-serif',V.fillText(ge(e.V,"V",3),Z+2,O+44);let q=Math.min(1,Math.log10(1+e.V*e.I)/Math.log10(101));V.save(),V.shadowColor=`rgba(255,140,60,${.9*q})`,V.shadowBlur=30*q,V.strokeStyle=`rgb(${150+105*q}, ${170-90*q}, ${255-200*q})`,V.lineWidth=4,V.beginPath(),V.moveTo(k,O-34);for(let Y=1;Y<=6;Y++)V.lineTo(k+(Y%2?11:-11),O-34+68*Y/6);V.lineTo(k,O+34),V.stroke(),V.restore(),V.fillStyle="#e6ebf5",V.textAlign="left",V.fillText(isFinite(e.R)?ge(e.R,"\u03A9",3):"\u221E",k+20,O+4);let $=Y=>{let ne=(Y%1+1)%1*ee,le=k-Z,he=D-H;return ne<le?[Z+ne,H]:(ne-=le,ne<he?[k,H+ne]:(ne-=he,ne<le?[k-ne,D]:(ne-=le,[Z,D-ne])))};for(let Y=0;Y<B;Y++){let[ne,le]=$(Y/B-S);V.fillStyle="#6cb4ff",V.shadowColor="#6cb4ff",V.shadowBlur=6,V.beginPath(),V.arc(ne,le,3.2,0,2*Math.PI),V.fill(),V.shadowBlur=0}V.fillStyle="#ffe066",V.font='600 13px "Segoe UI", sans-serif',V.textAlign="center",V.fillText(`I = ${ge(e.I,"A",3)}  \u2192`,(Z+k)/2,H-12)}return h(),d(),b=requestAnimationFrame(G),{destroy(){cancelAnimationFrame(b),[x,m,g,y,M].forEach(C=>C.destroy())}}}};var qp=_i/(4*Math.PI);function Fx(s,e,t=96,n=0){let i=new Float64Array(7*t),r=2*Math.PI/t;for(let a=0;a<t;a++){let o=(a+.5)*r,l=7*a;i[l]=s*Math.cos(o),i[l+1]=s*Math.sin(o),i[l+2]=n,i[l+3]=-s*r*Math.sin(o),i[l+4]=s*r*Math.cos(o),i[l+5]=0,i[l+6]=e}return i}function Mw(s){let e=s.reduce((i,r)=>i+r.length,0),t=new Float64Array(e),n=0;for(let i of s)t.set(i,n),n+=i.length;return t}function Ox(s,e,t,n){let i=0,r=0,a=0;for(let o=0;o<s.length;o+=7){let l=e-s[o],c=t-s[o+1],h=n-s[o+2],u=l*l+c*c+h*h+1e-12,d=s[o+6]/(u*Math.sqrt(u)),f=s[o+3],p=s[o+4],x=s[o+5];i+=d*(p*h-x*c),r+=d*(x*l-f*h),a+=d*(f*c-p*l)}return[qp*i,qp*r,qp*a]}function $p(s,e,t,n,i){let r=n-e,a=i-t,o=r*r+a*a+1e-12,l=_i*s/(2*Math.PI*o);return[-l*a,l*r,0]}var no={wire:(s,e)=>_i*s/(2*Math.PI*e),loopCenter:(s,e)=>_i*s/(2*e),loopAxis:(s,e,t)=>_i*s*e*e/(2*Math.pow(e*e+t*t,1.5)),solenoidInfinite:(s,e,t)=>_i*s*t/e,solenoidCenter:(s,e,t,n)=>_i*s*n/e*(e/Math.sqrt(e*e+4*t*t)),parallelWiresForcePerLength:(s,e,t)=>_i*s*e/(2*Math.PI*t)};function Vx(s,e){if(s==="hilo")return{kind:s,axisymmetric:!1,scale:.1,bound:.8,B:(l,c,h)=>$p(e.I,0,0,l,c),meta:{I:e.I}};if(s==="hilos2"){let l=e.d,c=e.same?e.I:-e.I;return{kind:s,axisymmetric:!1,scale:l,bound:6*l,B:(h,u,d)=>{let f=$p(e.I,-l/2,0,h,u),p=$p(c,l/2,0,h,u);return[f[0]+p[0],f[1]+p[1],0]},meta:{I1:e.I,I2:c,d:l,F:no.parallelWiresForcePerLength(e.I,c,l)}}}let t=(l,c)=>{if(s==="espira")return Fx(e.R,e.I,c);let h=Math.min(e.N,l),u=e.I*e.N/h,d=[];for(let f=0;f<h;f++){let p=-e.L/2+e.L*(f+.5)/h;d.push(Fx(e.R,u,c,p))}return Mw(d)},n=e.R,i=s==="espira"?0:e.L,r=t(40,s==="espira"?128:64),a=t(16,s==="espira"?48:32),o=Math.max(n,i/2);return{kind:s,axisymmetric:!0,scale:o,bound:8*o,segs:r,R:n,L:i,B:(l,c,h)=>Ox(r,l,c,h),Bfast:(l,c,h)=>Ox(a,l,c,h),meta:{R:n,L:i,N:e.N,I:e.I}}}function Bx(s,e,t,{h:n,maxSteps:i=900,bound:r=10}={}){let a=(d,f,p)=>{let x=s(d,f,p),m=Math.hypot(x[0],x[1],x[2])||1;return[t*x[0]/m,t*x[1]/m,t*x[2]/m]},o=[e[0],e[1],e[2]],l=e[0],c=e[1],h=e[2],u=!1;for(let d=0;d<i;d++){let f=a(l,c,h),p=a(l+.5*n*f[0],c+.5*n*f[1],h+.5*n*f[2]),x=a(l+.5*n*p[0],c+.5*n*p[1],h+.5*n*p[2]),m=a(l+n*x[0],c+n*x[1],h+n*x[2]);if(l+=n/6*(f[0]+2*p[0]+2*x[0]+m[0]),c+=n/6*(f[1]+2*p[1]+2*x[1]+m[1]),h+=n/6*(f[2]+2*p[2]+2*x[2]+m[2]),o.push(l,c,h),Math.hypot(l,c,h)>r)break;if(d>20&&Math.hypot(l-e[0],c-e[1],h-e[2])<1.1*n){u=!0;break}}return{pts:o,closed:u}}function zx(s,e,t){let n=Bx(s,e,1,t);if(n.closed)return new Float32Array(n.pts);let i=Bx(s,e,-1,t),r=[];for(let a=i.pts.length-3;a>=3;a-=3)r.push(i.pts[a],i.pts[a+1],i.pts[a+2]);return new Float32Array([...r,...n.pts])}function Sw(s,e,t){let i=new Float64Array(801),r=new Float64Array(801),a=0,o=s(0,0,0)[2],l=0;for(let u=1;u<=800;u++){i[u]=e*u/800;let d=s(i[u],0,0)[2];a+=.5*(o*i[u-1]+d*i[u])*(i[u]-i[u-1]),r[u]=a,o=d,a>r[l]&&(l=u)}let c=r[l],h=[];if(c<=0)return h;for(let u=1;u<=t;u++){let d=c*u/(t+1);for(let f=1;f<=l;f++)if(r[f]>=d){let p=(d-r[f-1])/(r[f]-r[f-1]||1);h.push(i[f-1]+p*(i[f]-i[f-1]));break}}return h}function kx(s,e=12,t=8){let n=[];if(s.kind==="hilo"){let o=e;for(let l=1;l<=o;l++){let c=.3*l*s.scale*.5;for(let h of[-2,0,2]){let u=[];for(let d=0;d<=64;d++)u.push(c*Math.cos(2*Math.PI*d/64),c*Math.sin(2*Math.PI*d/64),h*s.scale*.5);n.push(new Float32Array(u))}}return n}if(s.kind==="hilos2"){let o=s.meta.d,l=o/40,c=Math.max(4,e),h=[];for(let u of[-o/2,o/2])for(let d=0;d<c;d++){let f=2*Math.PI*(d+.5)/c,p=.28*o*(1+d%3*.55);h.push(zx(s.B,[u+p*Math.cos(f),p*Math.sin(f),0],{h:l,bound:s.bound,maxSteps:1400}))}for(let u of[-1.2,0,1.2])for(let d of h){let f=new Float32Array(d);for(let p=2;p<f.length;p+=3)f[p]=u*o*.6;n.push(f)}return n}let i=s.scale/14,r=s.Bfast||s.B,a=Sw(r,4*s.scale,e);for(let[o,l]of a.entries()){let c=zx(r,[l,0,0],{h:i,bound:s.bound,maxSteps:1200});for(let h=0;h<t;h++){let u=2*Math.PI*h/t,d=Math.cos(u),f=Math.sin(u),p=new Float32Array(c.length);for(let x=0;x<c.length;x+=3)p[x]=d*c[x]-f*c[x+1],p[x+1]=f*c[x]+d*c[x+1],p[x+2]=c[x+2];p.base=o,n.push(p)}}return n}var Gx=[{value:"iman",label:"Im\xE1n de barra"},{value:"solenoide",label:"Solenoide"},{value:"espira",label:"Espira circular"},{value:"hilo",label:"Hilo recto largo"},{value:"hilos2",label:"Dos hilos paralelos"}],Hx={id:"magnetico",unidad:4,icono:"B",titulo:"Campo magn\xE9tico",corto:"Imanes, corrientes y l\xEDneas de B",mount(s){let e={kind:"solenoide",I:3,N:200,L:30,R:4,Bint:200,d:10,same:!1,invert:!1,nLines:8,lines:!0,arrows:!1,compass:!0,probe:[3,0,0]},t=null,n=1,i=T("div",{class:"viewport"}),r=new ei(i,{camera:[14,-17,10]}),a=new oe.Group,o=new oe.Group,l=new oe.Group,c=new oe.Group;r.scene.add(a,o,l,c);let h=new oe.Group;r.scene.add(h);let u=new Di(r,{size:.5,color:13625855,spacing:1.4,speed:2.8}),d=new Di(r,{size:.6,color:16769126,spacing:.8,speed:2.4,maxPerLine:60}),f={n:new oe.Vector3(1,0,0),w:new oe.Vector3,target:new oe.Vector3(1,0,0),arrow:null},p=T("div",{class:"hud"});i.append(T("div",{class:"overlay-bar"},p));let x=ln({label:"Fuente del campo",options:Gx,value:e.kind,onInput:O=>{e.kind=O,F(),D()}}),m=ht({label:"Corriente I",min:.1,max:30,value:e.I,log:!0,fmt:O=>ge(O,"A",3),onInput:O=>{e.I=O,ee()}}),g=ht({label:"N\xFAmero de espiras N",min:10,max:1e3,step:10,value:e.N,fmt:O=>`${O}`,onInput:O=>{e.N=O,ee()}}),y=ht({label:"Longitud L",min:5,max:50,step:1,value:e.L,fmt:O=>`${O} cm`,onInput:O=>{e.L=O,ee()}}),M=ht({label:"Radio R",min:1,max:15,step:.5,value:e.R,fmt:O=>`${O} cm`,onInput:O=>{e.R=O,ee()}}),_=ht({label:"Campo interior del im\xE1n",min:10,max:1500,value:e.Bint,log:!0,fmt:O=>`${O.toFixed(0)} mT`,onInput:O=>{e.Bint=O,ee()}}),w=ht({label:"Separaci\xF3n entre hilos d",min:2,max:30,step:1,value:e.d,fmt:O=>`${O} cm`,onInput:O=>{e.d=O,ee()}}),E=zt({label:"Corrientes en el mismo sentido (si no, opuestas)",value:e.same,onInput:O=>{e.same=O,ee()}}),P=zt({label:"Invertir el sentido de la corriente",value:e.invert,onInput:O=>{e.invert=O,ee()}}),b=ht({label:"Densidad de l\xEDneas de campo",min:3,max:20,step:1,value:e.nLines,fmt:O=>`${O}`,onInput:O=>{e.nLines=O,ee()}}),S=zt({label:"L\xEDneas de campo B",value:e.lines,onInput:O=>{e.lines=O,o.visible=O,u.setEnabled(O&&B.get()),r.invalidate()}}),I=zt({label:"Campo vectorial en el plano y = 0",value:e.arrows,onInput:O=>{e.arrows=O,l.visible=O,r.invalidate()}}),B=zt({label:"Animar el flujo del campo B (part\xEDculas sobre las l\xEDneas)",value:!0,onInput:O=>{u.setEnabled(O&&e.lines)}}),G=zt({label:"Animar la corriente en el conductor",value:!0,onInput:O=>{d.setEnabled(O)}}),z=zt({label:"Br\xFAjula en el punto de prueba",value:e.compass,onInput:O=>{e.compass=O,c.visible=O,r.invalidate()}}),C=["x","y","z"].map((O,ce)=>Jt({label:`${O} (cm)`,value:e.probe[ce],step:.5,onInput:q=>{e.probe[ce]=q,H()}})),N=Vt([{key:"B",label:"|B| en el punto de prueba"},{key:"comp",label:"Componentes (Bx, By, Bz)"},{key:"th",label:"Referencia anal\xEDtica"},{key:"extra",label:"Informaci\xF3n"}]);function F(){let O=($,Y)=>{$.style.display=Y?"":"none"},ce=e.kind;O(m.el,ce!=="iman"),O(g.el,ce==="solenoide"),O(y.el,ce==="solenoide"||ce==="iman"),O(M.el,ce==="solenoide"||ce==="iman"||ce==="espira"),O(_.el,ce==="iman"),O(w.el,ce==="hilos2"),O(E.el,ce==="hilos2"),O(P.el,ce==="solenoide"||ce==="espira"||ce==="hilo");let q=ce==="solenoide"||ce==="iman"||ce==="espira";O(b.el,q||ce==="hilos2"||ce==="hilo")}let V=T("aside",{class:"controls"},cn("Simulador de campo magn\xE9tico","Visualiza las l\xEDneas de campo B de imanes y corrientes. Los campos se calculan con la ley de Biot\u2013Savart (num\xE9rica) o con las expresiones anal\xEDticas.",["Unidad 4","Biot\u2013Savart"]),ot("Fuente",x.el,m.el,g.el,y.el,M.el,_.el,w.el,E.el,P.el),ot("Animaci\xF3n",B.el,G.el,T("p",{class:"note"},"Las part\xEDculas blancas siguen las l\xEDneas de B (m\xE1s r\xE1pidas donde el campo es intenso); las amarillas son los portadores de corriente. La br\xFAjula verde oscila hasta alinearse con B cuando cambias los par\xE1metros.")),ot("Visualizaci\xF3n",b.el,S.el,I.el,z.el),ot("Punto de prueba",T("div",{class:"row"},...C.map(O=>T("div",{class:"grow"},O.el))),N.el),T("p",{class:"note"},"Biot\u2013Savart: B = (\u03BC\u2080/4\u03C0) \u222E I dl \xD7 r\u0302 / r\xB2. Las l\xEDneas de B son siempre cerradas (\u2207\xB7B = 0). Color de las l\xEDneas: intensidad |B| en escala logar\xEDtmica."));s.append(T("div",{class:"mod"},V,T("div",{class:"stage"},i)));function se(){let O=e.invert?-1:1;switch(e.kind){case"iman":{let ce=e.L/100,q=40;return{L:ce,R:e.R/100,N:q,I:O*(e.Bint*.001)*ce/(_i*q)}}case"solenoide":return{I:O*e.I,N:e.N,L:e.L/100,R:e.R/100};case"espira":return{I:O*e.I,R:e.R/100};case"hilo":return{I:O*e.I};default:return{I:e.I,d:e.d/100,same:e.same}}}function J(){r.clear(a);let O=[],ce=(ne,le,he)=>{let Ae=[];for(let re=0;re<=72;re++){let ie=2*Math.PI*re/72*he;Ae.push(ne*Math.cos(ie),ne*Math.sin(ie),le)}return new Float32Array(Ae)},q=(ne,le,he={})=>new oe.Mesh(ne,new oe.MeshStandardMaterial({color:le,metalness:.3,roughness:.45,...he})),Y=se().I>=0?1:-1;if(e.kind==="iman"){let ne=t.L*n,le=t.R*n,he=q(new oe.CylinderGeometry(le,le,ne/2,40),14700623);he.rotation.x=Math.PI/2,he.position.z=ne/4;let Ae=q(new oe.CylinderGeometry(le,le,ne/2,40),5209056);Ae.rotation.x=Math.PI/2,Ae.position.z=-ne/4;let re=Zt("N",{size:.8,color:"#fff"});re.position.set(0,-le-.2,ne/2+.6);let ie=Zt("S",{size:.8,color:"#fff"});ie.position.set(0,-le-.2,-ne/2-.6),a.add(he,Ae,re,ie);for(let pe=0;pe<6;pe++)O.push({pts:ce(le*1.02,-ne/2+ne*(pe+.5)/6,1)})}else if(e.kind==="solenoide"){let ne=Math.min(t.meta.N,22),le=t.L*n,he=t.R*n,Ae=[];for(let ie=0;ie<=ne*24;ie++){let pe=ie/(ne*24),ve=2*Math.PI*ne*pe*Y;Ae.push(new oe.Vector3(he*Math.cos(ve),he*Math.sin(ve),-le/2+le*pe))}let re=q(new oe.TubeGeometry(new oe.CatmullRomCurve3(Ae),ne*24*2,.045,8),14066524,{metalness:.7});a.add(re),O.push({pts:new Float32Array(Ae.flatMap(ie=>[ie.x,ie.y,ie.z]))}),a.add(Zt(`N = ${t.meta.N}`,{size:.5,color:"#d6a35c"})),a.children[a.children.length-1].position.set(0,-he-.6,le/2+.5)}else if(e.kind==="espira"){let ne=t.R*n;a.add(q(new oe.TorusGeometry(ne,.06,14,72),14066524,{metalness:.7})),O.push({pts:ce(ne,0,Y)});for(let le=0;le<4;le++){let he=Math.PI/2*le+.4;a.add(As([ne*Math.cos(he),ne*Math.sin(he),0],[-Y*Math.sin(he),Y*Math.cos(he),0],{color:16769126,size:.35}))}}else(e.kind==="hilo"?[0]:[-t.meta.d/2,t.meta.d/2]).forEach((le,he)=>{let Ae=e.kind==="hilo"?Y:he===0||t.meta.I2>=0?1:-1,re=q(new oe.CylinderGeometry(.07,.07,14,16),14066524,{metalness:.7});re.rotation.x=Math.PI/2,re.position.x=le*n,a.add(re),O.push({pts:new Float32Array([le*n,0,-7,le*n,0,7]),flip:Ae<0});for(let ie of[-4,0,4])a.add(As([le*n,0,ie-.2*Ae],[0,0,Ae],{color:16769126,size:.45}))});d.setLines(O),d.setEnabled(G.get()),r.invalidate()}function Z(){r.clear(o);let O=kx(t,e.nLines,8),ce=t.Bfast||t.B,q=new Map,$=ie=>{let pe=ie.base!==void 0?ie.base:null;if(pe!==null&&q.has(pe))return q.get(pe);let ve=ie.length/3,we=new Float32Array(ve),ke=Q=>{let U=ce(ie[3*Q],ie[3*Q+1],ie[3*Q+2]);return Math.log10(Math.hypot(U[0],U[1],U[2])+1e-15)},Ue=0,Re=ke(0);for(we[0]=Re;Ue<ve-1;){let Q=Math.min(Ue+3,ve-1),U=ke(Q);for(let Te=Ue+1;Te<=Q;Te++)we[Te]=Re+(U-Re)*(Te-Ue)/(Q-Ue);Ue=Q,Re=U}return pe!==null&&q.set(pe,we),we},Y=O.map($),ne=[];for(let ie of Y)for(let pe=0;pe<ie.length;pe+=5)ne.push(ie[pe]);ne.sort((ie,pe)=>ie-pe);let le=ne[Math.floor(ne.length*.04)]??-9,he=ne[Math.floor(ne.length*.96)]??-3,Ae=[],re=e.kind==="hilo"&&se().I<0;O.forEach((ie,pe)=>{let ve=ie.length/3,we=new Float32Array(ie.length),ke=new Float32Array(ie.length),Ue=new Float32Array(ve);for(let Q=0;Q<ie.length;Q++)we[Q]=ie[Q]*n;for(let Q=0;Q<ve;Q++){let U=Math.min(1,Math.max(0,(Y[pe][Q]-le)/(he-le||1)));ke.set(Ts(.15+.85*U),3*Q),Ue[Q]=.45+1.6*U}Ae.push({pts:we,fac:Ue,flip:re}),o.add(r.fatLine(we,{colors:ke,width:1.9}));let Re=Math.floor(ve*.3);if(Re+1<ve){let Q=t.B(ie[3*Re],ie[3*Re+1],ie[3*Re+2]);o.add(As([we[3*Re],we[3*Re+1],we[3*Re+2]],Q,{color:16777215,size:.28}))}}),o.visible=e.lines,u.setLines(Ae),u.setEnabled(B.get()&&e.lines),r.invalidate()}function k(){r.clear(l);let O=15,ce=4.4/n,q=t.Bfast||t.B,$=[];for(let he=0;he<O;he++)for(let Ae=0;Ae<O;Ae++){let re=-ce+2*ce*Ae/(O-1),ie=-ce+2*ce*he/(O-1),pe=q(re,0,ie),ve=Math.hypot(pe[0],pe[1],pe[2]);$.push({x:re,z:ie,b:pe,m:ve})}let Y=$.map(he=>Math.log10(he.m+1e-15)).sort((he,Ae)=>he-Ae),ne=Y[Math.floor(Y.length*.05)],le=Y[Math.floor(Y.length*.95)];for(let he of $){if(!(he.m>0))continue;let Ae=Ts(.1+.9*((Math.log10(he.m)-ne)/(le-ne||1)));l.add(As([he.x*n,0,he.z*n],he.b,{color:new oe.Color(Ae[0],Ae[1],Ae[2]),size:.28}))}l.visible=e.arrows,r.invalidate()}function H(){r.clear(c);let[O,ce,q]=e.probe.map(pe=>pe/100),$=t.B(O,ce,q),Y=Math.hypot(...$),ne=new oe.Mesh(new oe.SphereGeometry(.13,16,12),new oe.MeshBasicMaterial({color:16777215}));if(ne.position.set(O*n,ce*n,q*n),c.add(ne),Y>0){f.target.set($[0],$[1],$[2]).normalize(),f.arrow=new oe.ArrowHelper(f.n.clone(),new oe.Vector3(O*n,ce*n,q*n),1.8,8054146,.5,.3),c.add(f.arrow);let pe=new oe.ArrowHelper(f.n.clone().negate(),new oe.Vector3(O*n,ce*n,q*n),1.1,5925775,.01,.01);f.back=pe,c.add(pe)}else f.arrow=null;c.visible=e.compass;let le=pe=>ge(pe,"T",3),he=["\u2014",""],Ae=["",""],re=Math.hypot(O,ce),ie=se();if(e.kind==="hilo"){let pe=no.wire(Math.abs(ie.I),re);he=[le(pe),"\u03BC\u2080I / (2\u03C0\u03C1)"]}else e.kind==="espira"?re<1e-6?he=[le(Math.abs(no.loopAxis(ie.I,ie.R,q))),"\u03BC\u2080IR\xB2/2(R\xB2+z\xB2)^{3/2} (sobre el eje)"]:he=["\u2014","fuera del eje: s\xF3lo num\xE9rico"]:e.kind==="solenoide"||e.kind==="iman"?Math.hypot(O,ce,q)<1e-6?he=[le(no.solenoidCenter(ie.N,ie.L,ie.R,Math.abs(ie.I))),"centro del solenoide finito"]:he=[le(no.solenoidInfinite(ie.N,ie.L,Math.abs(ie.I))),"B ideal interior \u03BC\u2080NI/L"]:Ae=[`F/L = ${ge(Math.abs(t.meta.F),"N/m",3)}`,t.meta.F>0?"atracci\xF3n (corrientes paralelas)":"repulsi\xF3n (corrientes opuestas)"];N.update({B:[le(Y),""],comp:[`${ge($[0],"T",2)}, ${ge($[1],"T",2)}, ${ge($[2],"T",2)}`,""],th:he,extra:Ae}),r.invalidate()}function D(){t=Vx(e.kind,se()),n=3/t.scale,r.clear(h),h.add(Es(8,{labels:!0})),p.textContent=`Escala: 1 unidad de la escena = ${ge(1/n,"m",2)} \xB7 ${Gx.find(O=>O.value===e.kind).label}`,J(),Z(),k(),H()}let ee=qn(D,70);return F(),D(),r.onFrame(O=>{if(!f.arrow)return;let ce=Math.min(O,.04),q=f.target.clone().sub(f.n).multiplyScalar(60).addScaledVector(f.w,-5);f.w.addScaledVector(q,ce),f.n.addScaledVector(f.w,ce).normalize(),f.arrow.setDirection(f.n),f.back&&f.back.setDirection(f.n.clone().negate()),r.invalidate()}),{destroy(){u.dispose(),d.dispose(),r.dispose()}}}};var Wx={electron:{nombre:"Electr\xF3n",q:-An,m:Qa},proton:{nombre:"Prot\xF3n",q:An,m:dd},alpha:{nombre:"Part\xEDcula \u03B1",q:2*An,m:4.001506*Cs},custom:{nombre:"Personalizada\u2026",q:An,m:12*Cs}},Yp={helice:{nombre:"H\xE9lice: prot\xF3n en B uniforme",particle:"proton",speed:1e5,elev:30,azim:0,E:[0,0,0],B:[0,0,.1],periods:4},selector:{nombre:"Selector de velocidades (v = E/B, trayectoria recta)",particle:"proton",speed:1e5,elev:0,azim:0,E:[0,1e4,0],B:[0,0,.1],periods:3},cicloide:{nombre:"Cicloide: deriva E\xD7B desde el reposo",particle:"proton",speed:0,elev:0,azim:0,E:[0,1e3,0],B:[0,0,.1],periods:4},trocoide:{nombre:"Trocoide: v\u2080 distinta de E/B",particle:"proton",speed:4e4,elev:0,azim:0,E:[0,1e4,0],B:[0,0,.1],periods:4},ciclotron:{nombre:"Ciclotr\xF3n: electr\xF3n en B uniforme",particle:"electron",speed:1e6,elev:0,azim:0,E:[0,0,0],B:[0,0,.001],periods:3},oblicuo:{nombre:"H\xE9lice con campo E paralelo a B (aceleraci\xF3n axial)",particle:"proton",speed:8e4,elev:20,azim:0,E:[0,0,3e3],B:[0,0,.1],periods:4}},Xx={id:"lorentz",unidad:4,icono:"F",titulo:"Fuerza de Lorentz",corto:"Part\xEDcula en campos E y B cruzados",mount(s){let e={particle:"proton",qe:1,mu:12,speed:1e5,elev:30,azim:0,E:[0,0,0],B:[0,0,.1],periods:4,T:1e-6,method:"boris",stepsPer:40,proj:!0},t=null,n=1,i=null,r=T("div",{class:"viewport"}),a=new ei(r,{camera:[9.5,-11,7.5]}),o=new oe.Group,l=new oe.Group;a.scene.add(o,l);let c=new eo(a),h=T("div",{class:"hud"}),u=T("div",{class:"hud"});r.append(T("div",{class:"overlay-bar"},h),T("div",{class:"hud-bottom"},u));let d=ln({label:"Escenarios de ejemplo",options:[{value:"",label:"Elegir un escenario\u2026"},...Object.entries(Yp).map(([D,ee])=>({value:D,label:ee.nombre}))],onInput:D=>{D&&V(Yp[D]),d.set("")}}),f=ln({label:"Part\xEDcula",options:Object.entries(Wx).map(([D,ee])=>({value:D,label:ee.nombre})),value:e.particle,onInput:D=>{e.particle=D,m.style.display=D==="custom"?"":"none",Z()}}),p=Jt({label:"Carga (m\xFAltiplos de e)",value:1,step:1,onInput:D=>{e.qe=D,Z()}}),x=Jt({label:"Masa (u)",value:12,step:.5,min:.001,onInput:D=>{e.mu=D,Z()}}),m=T("div",{class:"row",style:{display:"none"}},T("div",{class:"grow"},p.el),T("div",{class:"grow"},x.el)),g=ht({label:"Rapidez inicial v\u2080",min:0,max:5e7,step:1e3,value:e.speed,fmt:D=>ge(D,"m/s",3),onInput:D=>{e.speed=D,Z()}}),y=ht({label:"Elevaci\xF3n de v\u2080 (desde el plano xy)",min:-90,max:90,step:1,value:e.elev,unit:"\xB0",onInput:D=>{e.elev=D,Z()}}),M=ht({label:"Azimut de v\u2080",min:-180,max:180,step:1,value:e.azim,unit:"\xB0",onInput:D=>{e.azim=D,Z()}}),_=["x","y","z"].map((D,ee)=>Jt({label:`E${D} (V/m)`,value:e.E[ee],step:100,onInput:O=>{e.E[ee]=O,Z()}})),w=["x","y","z"].map((D,ee)=>Jt({label:`B${D} (T)`,value:e.B[ee],step:.01,onInput:O=>{e.B[ee]=O,Z()}})),E=ht({label:"Duraci\xF3n (per\xEDodos ciclotr\xF3nicos)",min:.5,max:20,step:.5,value:e.periods,fmt:D=>`${D}`,onInput:D=>{e.periods=D,Z()}}),P=ht({label:"Duraci\xF3n T (si B = 0)",min:1e-9,max:.001,value:e.T,log:!0,fmt:D=>ge(D,"s",3),onInput:D=>{e.T=D,Z()}}),b=Rn([{value:"boris",label:"Boris"},{value:"rk45",label:"RK45"}],"boris",D=>{e.method=D,Z()}),S=ht({label:"Pasos por per\xEDodo (Boris)",min:8,max:200,step:2,value:e.stepsPer,fmt:D=>`${D}`,onInput:D=>{e.stepsPer=D,Z()}}),I=zt({label:"Proyecci\xF3n sobre el plano \u27C2 B",value:e.proj,onInput:D=>{e.proj=D,Z()}}),B=T("aside",{class:"controls"},cn("Simulador de la fuerza de Lorentz","Lanza una part\xEDcula en campos E y B (por ejemplo cruzados) y compara el movimiento con la teor\xEDa: h\xE9lices, cicloides y selector de velocidades.",["Unidad 4","F = q(E + v \xD7 B)"]),ot("Escenarios",d.el),ot("Part\xEDcula",f.el,m,g.el,y.el,M.el),ot("Campo el\xE9ctrico E",T("div",{class:"row"},..._.map(D=>T("div",{class:"grow"},D.el)))),ot("Campo magn\xE9tico B",T("div",{class:"row"},...w.map(D=>T("div",{class:"grow"},D.el)))),ot("Simulaci\xF3n",E.el,P.el,T("div",{class:"field"},T("span",{class:"lbl"},T("span",{},"Integrador")),b.el),S.el,I.el),T("p",{class:"note"},"m dv/dt = q(E + v\xD7B). Radio de Larmor r = m v\u22A5 / (|q|B); \u03C9 = |q|B/m; deriva v_d = E\xD7B / B\xB2. El integrador de Boris conserva |v| en un campo B puro.")),G=Vt([{key:"w",label:"Frecuencia ciclotr\xF3nica \u03C9"},{key:"T",label:"Per\xEDodo T = 2\u03C0/\u03C9"},{key:"r",label:"Radio de Larmor (teor\xEDa)"},{key:"rm",label:"Radio medido"},{key:"vd",label:"Deriva E\xD7B (teor\xEDa)"},{key:"vm",label:"Velocidad media (teor\xEDa | medida)"},{key:"pitch",label:"Paso de la h\xE9lice v\u2225\xB7T"},{key:"en",label:"Error de energ\xEDa"}]),z=new Lt({xlabel:"tiempo (s)",ylabel:"error relativo de energ\xEDa",xfmt:D=>ge(D,"s",2),yfmt:D=>D.toExponential(0),height:230,yZero:!1}),C=_d(c),N=T("div",{class:"stage scroll"},r,C.el,T("div",{class:"grid-2"},T("div",{class:"card"},T("h3",{},"Resultados: teor\xEDa frente a simulaci\xF3n"),G.el),T("div",{class:"card"},T("h3",{},"Calidad num\xE9rica"),z.el,T("p",{class:"help"},"Se grafica |\u0394K \u2212 qE\xB7\u0394r| / K\u2080 con el integrador elegido (debe ser cero: el campo B no realiza trabajo)."))));s.append(T("div",{class:"mod"},B,N));let F=()=>e.particle==="custom"?{q:e.qe*An,m:e.mu*Cs}:Wx[e.particle];function V(D){Object.assign(e,{particle:D.particle,speed:D.speed,elev:D.elev,azim:D.azim,E:[...D.E],B:[...D.B],periods:D.periods}),f.set(e.particle),m.style.display="none",g.set(e.speed),y.set(e.elev),M.set(e.azim),E.set(e.periods),_.forEach((ee,O)=>ee.set(e.E[O])),w.forEach((ee,O)=>ee.set(e.B[O])),Z(),c.focus(),c.restart()}function se(D,ee,O,ce,q,$){return vd({q:ee,m:O,r0:[0,0,0],v0:ce,T:q,Efun:()=>e.E,Bfun:()=>e.B,method:D,nSteps:$,nSamples:Math.max(800,$)})}function J(D,ee,O){let ce=bd(O,D.vel),q=D.t.length,$=new Float64Array(q);for(let Y=0;Y<q;Y++){let ne=ee*(e.E[0]*D.pos[3*Y]+e.E[1]*D.pos[3*Y+1]+e.E[2]*D.pos[3*Y+2]);$[Y]=Math.abs(ce[Y]-ce[0]-ne)/(ce[0]+Math.abs(ne)+1e-300)}return $}function Z(){let{q:D,m:ee}=F(),O=Er(e.elev),ce=Er(e.azim),q=[e.speed*Math.cos(O)*Math.cos(ce),e.speed*Math.cos(O)*Math.sin(ce),e.speed*Math.sin(O)],$=Math.hypot(...e.B);i=bx({q:D,m:ee,v0:q,E:e.E,B:e.B});let Y=$>0?e.periods*i.period:e.T;P.el.style.display=$>0?"none":"",E.el.style.display=$>0?"":"none",S.el.style.display=e.method==="boris"?"":"none";let ne=Math.max(40,Math.round(($>0?e.periods:10)*e.stepsPer));t=se(e.method,D,ee,q,Y,ne);let le=se(e.method==="boris"?"rk45":"boris",D,ee,q,Y,ne);t.meta={q:D,m:ee,v0:q,T:Y,Bm:$};let he=0;for(let Ae=0;Ae<t.pos.length;Ae++)he=Math.max(he,Math.abs(t.pos[Ae]));n=xd(Math.max(he,1e-12)/7),k(),c.load(t,n),c.forceFn=(Ae,re)=>{let ie=e.E,pe=e.B;return[D*(ie[0]+re[1]*pe[2]-re[2]*pe[1]),D*(ie[1]+re[2]*pe[0]-re[0]*pe[2]),D*(ie[2]+re[0]*pe[1]-re[1]*pe[0])]},H(t,le,D,ee,q,Y)}function k(){a.clear(o),a.clear(l),o.add(Es(10,{labels:!0})),h.textContent=`Cada divisi\xF3n = ${ge(n,"m",2)} \xB7 ejes de \xB1${ge(10*n,"m",2)}`;let D=(ee,O,ce,q)=>{if(Math.hypot(...ee)===0)return;let Y=new oe.Vector3(...ee).normalize();for(let le=-1;le<=1;le++){let he=new oe.Vector3().crossVectors(Y,new oe.Vector3(0,0,1));he.length()<.1&&he.set(1,0,0),he.normalize().multiplyScalar(.9*le),l.add(new oe.ArrowHelper(Y,new oe.Vector3(...O).add(he),3.2,ce,.55,.3))}let ne=Zt(q,{color:"#"+ce.toString(16).padStart(6,"0"),size:.6});ne.position.set(O[0]+Y.x*4,O[1]+Y.y*4,O[2]+Y.z*4+.6),l.add(ne)};if(D(e.B,[-6,-6.5,.5],5941759,`B = ${ge(Math.hypot(...e.B),"T",2)}`),D(e.E,[-6,6.5,.5],16755021,`E = ${ge(Math.hypot(...e.E),"V/m",2)}`),i.driftSpeed>0){let ee=new oe.Vector3(...i.drift).normalize();l.add(new oe.ArrowHelper(ee,new oe.Vector3(0,0,0),5.5,8054146,.7,.4));let O=Zt(`v_d = ${ge(i.driftSpeed,"m/s",3)}`,{color:"#7ae582",size:.6});O.position.set(ee.x*6.3,ee.y*6.3,ee.z*6.3+.7),l.add(O)}if(e.proj&&i.omega>0){let ee=new oe.Vector3(...e.B).normalize(),O=1/0,ce=t.t.length;for(let Y=0;Y<ce;Y++)O=Math.min(O,(t.pos[3*Y]*ee.x+t.pos[3*Y+1]*ee.y+t.pos[3*Y+2]*ee.z)/n);let q=O-.8,$=new Float32Array(3*ce);for(let Y=0;Y<ce;Y++){let ne=new oe.Vector3(t.pos[3*Y],t.pos[3*Y+1],t.pos[3*Y+2]).multiplyScalar(1/n),le=ne.dot(ee);ne.addScaledVector(ee,q-le),$.set([ne.x,ne.y,ne.z],3*Y)}l.add(a.fatLine($,{color:8951475,width:1.6,opacity:.7}))}a.invalidate()}function H(D,ee,O,ce,q,$){let Y=D.t.length-1,ne=D.meta.Bm,le=J(D,O,ce),he=J(ee,O,ce),Ae=Math.max(...le),re=Math.max(...he),ie="\u2014",pe="\u2014",ve="\u2014";if(ne>0){let ye=e.B.map(xe=>xe/ne),R=O*(e.E[0]*ye[0]+e.E[1]*ye[1]+e.E[2]*ye[2])/ce,v=new Float64Array(3*(Y+1));for(let xe=0;xe<=Y;xe++){let ae=D.t[xe],fe=i.vParallel*ae+.5*R*ae*ae;for(let Ce=0;Ce<3;Ce++)v[3*xe+Ce]=D.pos[3*xe+Ce]-i.drift[Ce]*ae-fe*ye[Ce]}let X=[0,0,0];for(let xe=0;xe<Y;xe++){let ae=D.t[xe+1]-D.t[xe];for(let fe=0;fe<3;fe++)X[fe]+=.5*(v[3*xe+fe]+v[3*(xe+1)+fe])*ae}for(let xe=0;xe<3;xe++)X[xe]/=$;let W=0;for(let xe=0;xe<Y;xe++){let ae=D.t[xe+1]-D.t[xe],fe=Math.hypot(v[3*xe]-X[0],v[3*xe+1]-X[1],v[3*xe+2]-X[2]),Ce=Math.hypot(v[3*xe+3]-X[0],v[3*xe+4]-X[1],v[3*xe+5]-X[2]);W+=.5*(fe+Ce)*ae}ie=W/$;let te=[D.pos[3*Y]/$,D.pos[3*Y+1]/$,D.pos[3*Y+2]/$];pe=Math.hypot(...te);let _e=i.drift.map((xe,ae)=>xe+(i.vParallel+.5*R*$)*ye[ae]);ve=Math.hypot(..._e),Math.abs(e.periods-Math.round(e.periods))>1e-9&&e.periods%1,ie=e.periods%1===0?ie:NaN}G.update({w:[ne>0?ge(i.omega,"rad/s",3):"\u2014","\u03C9 = |q|B/m"],T:[ne>0?ge(i.period,"s",3):"\u2014",""],r:[ne>0&&i.radius>0?ge(i.radius,"m",4):"\u2014",`v\u22A5 = ${ge(i.vPerp,"m/s",3)}`],rm:[isFinite(ie)?ge(ie,"m",4):"\u2014",isFinite(ie)?`diferencia ${(Math.abs(ie-i.radius)/(i.radius||1)*100).toExponential(1)} %`:"requiere per\xEDodos enteros",isFinite(ie)&&Math.abs(ie-i.radius)/(i.radius||1)<.005?"good":""],vd:[i.driftSpeed>0?ge(i.driftSpeed,"m/s",4):"\u2014",i.driftSpeed>0?"E\xD7B / B\xB2":""],vm:[ne>0?`${ge(ve,"m/s",3)}  |  ${isFinite(pe)?ge(pe,"m/s",3):"\u2014"}`:"\u2014","sobre per\xEDodos completos"],pitch:[ne>0?ge(Math.abs(i.vParallel)*i.period,"m",3):"\u2014","v\u2225 = "+ge(i.vParallel,"m/s",3)],en:[Ae.toExponential(1),`${D.method==="boris"?"Boris":"RK45"} \xB7 el otro: ${re.toExponential(1)}`,Ae<1e-6?"good":"warn"]});let we=Math.max(1,Math.floor(Y/400)),ke=[],Ue=[],Re=[];for(let ye=0;ye<=Y;ye+=we)ke.push(D.t[ye]),Ue.push(Math.max(le[ye],1e-18));let Q=ee.t.length-1,U=Math.max(1,Math.floor(Q/400)),Te=[];for(let ye=0;ye<=Q;ye+=U)Te.push(ee.t[ye]),Re.push(Math.max(he[ye],1e-18));z.opts.ylabel="log\u2081\u2080(error relativo)",z.opts.yfmt=ye=>`10^${ye.toFixed(0)}`,z.set({series:[{x:ke,y:Ue.map(ye=>Math.log10(ye)),label:D.method==="boris"?"Boris":"RK45"},{x:Te,y:Re.map(ye=>Math.log10(ye)),label:ee.method==="boris"?"Boris":"RK45",color:"#ff9f6b",dash:[6,4]}]})}return c.onChange(D=>{if(!D.run)return;let ee=D.state();u.textContent=`t = ${ge(ee.t,"s",3)} \xB7 v = ${ge(Math.hypot(...ee.v),"m/s",3)} \xB7 r = (${vn(ee.r[0],2)}, ${vn(ee.r[1],2)}, ${vn(ee.r[2],2)}) m`}),r.append(T("div",{class:"overlay-bar",style:{top:"auto",bottom:"52px",justifyContent:"flex-end"}},T("div",{class:"hud"},T("span",{style:{color:"#7ae582"}},"\u2192 velocidad v"),"  ",T("span",{style:{color:"#ff5c7a"}},"\u2192 fuerza F = q(E + v\xD7B)")))),V(Yp.helice),{destroy(){C.destroy(),c.dispose(),z.destroy(),a.dispose()}}}};var qx={id:"ayuda",titulo:"Ayuda",mount(s){return s.append(T("div",{class:"help-page"},T("h2",{},"C\xF3mo usar el simulador"),T("p",{},"Elige un m\xF3dulo en el men\xFA lateral. Cada m\xF3dulo tiene un panel de controles a la izquierda y la visualizaci\xF3n a la derecha."),T("h2",{},"Controles en las escenas 3D"),T("ul",{},T("li",{},T("kbd",{},"Arrastrar")," con el bot\xF3n izquierdo: rotar la c\xE1mara."),T("li",{},T("kbd",{},"Rueda"),": acercar o alejar."),T("li",{},T("kbd",{},"Arrastrar derecho")," (o Shift + arrastrar): desplazar la vista."),T("li",{},"En el m\xF3dulo de cargas, arrastra una carga con el rat\xF3n para moverla en el plano horizontal.")),T("h2",{},"Unidades"),T("p",{},"Distancias en metros, cargas en nanocoulombs (nC), potencial en voltios (V) y campo en V/m. Los m\xF3dulos de part\xEDculas y de campo magn\xE9tico usan SI y reescalan la escena autom\xE1ticamente."),T("h2",{},"Escena compartida"),T("p",{},"Las cargas del m\xF3dulo \xABVisualizador de cargas\xBB se comparten con la \xABCalculadora de potencial\xBB y el \xABSimulador de trayectoria\xBB."),T("h2",{},"Validaci\xF3n"),T("p",{},"El motor f\xEDsico se verifica con pruebas autom\xE1ticas contra soluciones anal\xEDticas y contra una implementaci\xF3n independiente en Python (NumPy/SciPy). Consulta el informe t\xE9cnico."))),{}}};var Jp=[_x,vx,Sx,Rx,Px,Ux,Nx,Hx,Xx],$x={1:"Unidad 1 \xB7 Electricidad, campo y potencial",2:"Unidad 2 \xB7 Capacitores y diel\xE9ctricos",3:"Unidad 3 \xB7 Corriente el\xE9ctrica y ley de Ohm",4:"Unidad 4 \xB7 Fuerza y campo magn\xE9tico"},Nc=document.getElementById("nav"),Zp=document.getElementById("app"),Sd=null,Yx={};function ww(){Nc.replaceChildren();for(let s of Object.keys($x)){let e=Jp.filter(r=>String(r.unidad)===s),t=T("button",{type:"button",class:"nav-unit","aria-expanded":"false"},T("span",{},$x[s]),T("span",{class:"count"},String(e.length)),T("span",{class:"chev"},"\u25B6")),n=T("div",{class:"nav-items"},e.map(r=>T("a",{href:`#${r.id}`,"data-id":r.id},T("span",{class:"ico"},r.icono),T("span",{},r.titulo,T("small",{},r.corto))))),i=T("div",{class:"nav-group"},t,n);t.addEventListener("click",()=>{let r=!i.classList.contains("open");i.classList.toggle("open",r),t.setAttribute("aria-expanded",String(r))}),Yx[s]=i,Nc.append(i)}}function Ew(s){let e=Yx[String(s)];e&&(e.classList.add("open"),e.querySelector(".nav-unit").setAttribute("aria-expanded","true"))}function Zx(){let s=(location.hash||"#cargas").slice(1),e=s==="ayuda"?qx:Jp.find(t=>t.id===s)||Jp[0];if(Sd?.destroy)try{Sd.destroy()}catch(t){console.error(t)}Sd=null,Zp.replaceChildren();try{Sd=e.mount(Zp)}catch(t){console.error(t),Zp.replaceChildren(T("div",{class:"help-page"},T("h2",{},"No se pudo cargar el m\xF3dulo"),T("p",{},String(t&&t.message?t.message:t))))}Nc.querySelectorAll("a").forEach(t=>t.classList.toggle("active",t.dataset.id===e.id)),e.unidad&&Ew(e.unidad),Nc.classList.remove("open"),document.title=`${e.titulo} \xB7 Simulador de Campos E/M`}document.getElementById("menuBtn").addEventListener("click",()=>Nc.classList.toggle("open"));window.addEventListener("hashchange",Zx);ww();Zx();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
