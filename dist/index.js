"use strict";(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{let K={spaceBetween:12,allowTouchMove:!1,resistanceRatio:0,watchOverflow:!0,keyboard:{enabled:!0,onlyInViewport:!1},navigation:{nextEl:".slider-main_button.swiper-btn-next",prevEl:".slider-main_button.swiper-btn-prev"},breakpoints:{320:{slidesPerView:1},480:{slidesPerView:2},640:{slidesPerView:3},1024:{slidesPerView:6}}},Y=new Swiper(".swiper",K),ot=()=>{Y.destroy(),Y=new Swiper(".swiper",K)},W={},nt={Branco:"B",Inox:"I",Bronze:"BZ",Preto:"P",Nogueira:"N",Chumbo:"CH"},P={estores:{width:[80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300],height:[80,100,120,140,160,180,200,220,240,260,280,300,320]},calhas:{"5000-B":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"5000-I":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"5000-BZ":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"5000-P":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"5000-N":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"5000-CH":[120,140,160,180,200,220,240,260,300,350,400,450,500],"1500-B":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"1500-I":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"1500-BZ":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"1500-P":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"1500-N":[120,140,160,180,200,220,240,260,300,320,340,360,400,440,500,600],"1500-CH":[120,140,160,180,200,220,240,260,300,350,400,450,500],"9500M":[150,200,250,300,350,400,450,500,600,650,700,750,800,850,900,1e3,1200],KS:[160,200,240,300,400,500,600],"DSXL-B":[160,200,240,300,400,600],"DSXL-CZ":[160,200,240,300,400,600],"DSXL-P":[160,200,240,300,400,600]}},q=[],p=[],u="inicio",r={inicio:"",tecido:"",tipo:"",bainha:"",medidas:"",correcao:"",calha:"",suporte:"",instalacao:"",nome:"",email:"",contacto:""},g={usedWidths:[{name:"Franzido",widthRatio:2.5},{name:"Ondas",widthRatio:2.7},{name:"Macho Juntos",widthRatio:3},{name:"Pregas",widthRatio:2.5}],manufacturingPrices:[{name:"Franzido",blackout:9,normal:8},{name:"Ondas",blackout:8.5,normal:7.5},{name:"Macho Juntos",normal:13.5,blackout:13.5},{name:"Pregas",normal:13.5,blackout:13.5}],bainhaPrice:{price:3.5,widthMargin:20},uniao:{maxLength:400,price:8.6},prolongadores:3.7,roletesPrice:5,minWindowWidth:80,maxWindowWidth:650,minWindowHeight:80,maxWindowHeight:280,maxCalhaWidth:600,measuresCheckPrice:30,instalation:[{maxWidth:300,price:35},{maxWidth:400,price:40},{maxWidth:500,price:45},{maxWidth:600,price:50},{maxWidth:650,price:55}]},G=document.getElementById("sim-container"),m={step1:document.getElementById("simulator-heading-1"),step2:document.getElementById("simulator-heading-2"),step3:document.getElementById("simulator-heading-3"),step4:document.getElementById("simulator-heading-4"),step5:document.getElementById("simulator-heading-5")},c={inicio:document.getElementById("inicio-selector"),tecido:document.getElementById("tecido-selector"),tipo:document.getElementById("tipo-selector"),bainha:document.getElementById("bainha-selector"),medidas:document.getElementById("medidas-selector"),correcao:document.getElementById("correcao-selector"),suporte:document.getElementById("suporte-selector"),instalacao:document.getElementById("instalacao-selector")},v=document.getElementById("largura-input"),b=document.getElementById("altura-input"),T=document.querySelector("#correcao-switch"),D=document.querySelector("#bainha"),V=document.getElementById("tecto-radio-btn"),$=document.getElementById("parede-radio-btn"),F=document.querySelector("#instalacao-switch"),O=document.getElementById("seguinte-btn"),f={tecido:document.getElementById("step-tecido"),tipo:document.getElementById("step-tipo"),medidas:document.getElementById("step-medidas"),calha:document.getElementById("step-calha"),instalacao:document.getElementById("step-instalacao")},re=document.getElementById("nome-input"),le=document.getElementById("email-input"),de=document.getElementById("contacto-switch"),Q=document.getElementById("checkout-container"),ue=document.getElementById("new-window-contain"),me=document.getElementById("checkout-input-contain"),he=document.getElementById("new-window-btn"),pe=document.getElementById("no-window-btn"),fe=document.getElementById("enviar-btn"),y={tecido:document.getElementById("checkout-tecido"),tipo:document.getElementById("checkout-tipo"),bainha:document.getElementById("checkout-bainha"),largura:document.getElementById("checkout-largura"),altura:document.getElementById("checkout-altura"),correcao:document.getElementById("checkout-correcao"),calha:document.getElementById("checkout-calha"),suporte:document.getElementById("checkout-suporte"),instalacao:document.getElementById("checkout-instalacao")},ge=document.getElementById("cortina-radio-btn"),Ee=document.getElementById("estore-radio-btn"),Ce=document.getElementById("calha-radio-btn"),ve=()=>{Ge(),Ve(),_e(),ze(),Re(),He(),je(),Xe(),Ue(),Ke(),Ye(),Ze(),Je(),Me(),qe()},be=()=>{xe(),ve()},ke=e=>{let t=0,a=0,s="",o=e.tecido.split("-"),l=o[0],d=o[1],n=e.calha?e.calha.split("-"):null,E=n?n[0]:null,J=n?n[1]:null,I=e.medidas?e.medidas.split(" X ")[0]:0;if(e.inicio==="Cortina"&&(s=`${l}${d}`),e.inicio==="Estore"){let U=e.medidas?e.medidas.split(" X ")[1]:0;s=Ie(l,d,I,U)}if(t=typeof W[s].price=="string"?parseFloat(W[s].price):W[s].price,e.inicio==="Estore")return{product:t,calha:0};let L=(I/g.maxCalhaWidth|0)+1,Z=I<=g.maxCalhaWidth?I:I/L,N=Pe(E,e.tipo,J,Z,e?.suporte==="Parede");return a=W[N]?I<g.maxCalhaWidth?W[N].price:W[N].price*L:0,a+=I>g.maxCalhaWidth?g.prolongadores*L:I>g.uniao.maxLength?g.uniao.price*L:0,(N.startsWith("5000")||N.startsWith("1500"))&&(a+=I<g.maxCalhaWidth?g.roletesPrice:g.roletesPrice*L),{product:t,calha:a}},xe=()=>{fetch("https://docs.google.com/spreadsheets/d/1hkgiYOVj33yY6b--bJaNPZOvHFvQ4klM402z0xp-gjE/export?format=csv&gid=0&single=true").then(e=>e.text()).then(e=>{let t=e.trim().split(`
`),a=t[0].split(","),s=t.slice(1).map(l=>l.split(",")),o={};s.forEach(l=>{let[d,n]=l;o[d]||(o[d]={id:d,price:parseFloat(n)})}),W=o}).catch(e=>console.error("Error fetching CSV data:",e))},h=(e,t)=>{r[e.id.split("-")[0]]=t},M=e=>{r.calha=e},w=e=>{r.suporte=$.checked?"Parede":"Tecto"},Be=()=>{r.inicio="",r.tecido="",r.tipo="",r.bainha="",r.medidas="",r.correcao="",r.calha="",r.suporte="",r.instalacao=""},st=e=>{e.inicio==="Cortina"&&(h(c.inicio,"Cortina"),h(c.tecido,e.tecido),h(c.tipo,e.tipo),h(c.bainha,e.bainha),h(c.medidas,e.medidas),h(c.correcao,e.correcao),h(c.calha,e.calha),h(c.suporte,e.suporte),h(c.instalacao,e.instalacao)),e.inicio==="Estore"&&(h(c.inicio,"Estore"),h(c.tecido,e.tecido),h(c.medidas,e.medidas),h(c.correcao,e.correcao),h(c.instalacao,e.instalacao))},_=()=>{let e={inicio:r.inicio,bainha:r.bainha,tecido:r.tecido,tipo:r.tipo,medidas:r.medidas,correcao:r.correcao,calha:r.calha,suporte:r.suporte,instalacao:r.instalacao};p.push(e)},ye=()=>{X("Cortina"),Be(),$e(),ie("inicio")},k=()=>{switch(u){case"inicio":return r.inicio===""?(alert("Por favor selecione um valor"),!1):!0;case"tecido":return r.tecido===""?(alert("Por favor selecione um valor"),!1):!0;case"tipo":return r.tipo===""?(alert("Por favor selecione um valor"),!1):!0;case"medidas":return v?.value===""||b?.value===""?(alert("Preencha valores v\xE1lidos de largura e altura"),C(!1),!1):parseInt(v?.value)>g.maxWindowWidth?(alert("Largura m\xE1xima excedida"),C(!1),!1):parseInt(b?.value)>g.maxWindowHeight?(alert("Altura m\xE1xima excedida"),C(!1),!1):!0;case"calha":return r.calha===""?(alert("Por favor selecione um valor"),!1):!0;case"suporte":return r.suporte===""?(alert("Por favor selecione um valor"),!1):!0}return!0},Ie=(e,t,a,s)=>{let o=P.estores.width.find(d=>d>=a),l=P.estores.height.find(d=>d>=s);return`${e}${l}${o}`},Pe=(e,t,a,s,o)=>{if(e==="KS"){if(o){let n=P.calhas[e]?.find(E=>E>=s);return`${e}${t==="Franzido"?"F":"O"}${n}SP`}let d=P.calhas[e]?.find(n=>n>=s);return`${e}${t==="Franzido"?"F":"O"}${d}`}if(e==="DSXL"){if(o){let n=P.calhas[`${e}-${a}`]?.find(E=>E>=s);return`${e}${t==="Franzido"?"F":"O"}${n}${a}SP`}let d=P.calhas[`${e}-${a}`]?.find(n=>n>=s);return`${e}${t==="Franzido"?"F":"O"}${d}${a}`}if(e==="9500M"){if(o){let n=P.calhas[e].find(E=>E>=s);return`${e}${n}SP`}let d=P.calhas[e].find(n=>n>=s);return`${e}${d}`}if(o){let d=P.calhas[`${e}-${a}`].find(n=>n>=s);return`${e}${d}${a}SP`}let l=P.calhas[`${e}-${a}`].find(d=>d>=s);return`${e}${l}${a}`},Se=e=>{let t=e.getElementsByClassName("color_name");return t.length>0?t[0].textContent:null},ee=e=>{let t=e.getElementsByClassName("product_name");return t.length>0?t[0].textContent:null},We=e=>{switch(e){case"tecido":case"inicio":return"step1";case"tipo":case"bainha":return"step2";case"medidas":case"correcao":return"step3";case"calha":return"step4";case"instalacao":return"step5"}},X=e=>{e==="Estore"&&Ee?.click(),e==="Cortina"&&ge?.click(),e==="Calha"&&Ce?.click()},$e=()=>{let e=document.querySelectorAll("[id^='inicio-card']"),t=document.querySelectorAll("[id^='tipo-card']"),a=document.querySelectorAll("[id^='tecido-card']"),s=document.querySelectorAll(".tecido_color");e.forEach(o=>{S(o)}),t.forEach(o=>{S(o)}),a.forEach(o=>{S(o)}),s.forEach(o=>{j(o)}),v.value="",b.value="",T.checked=!1,F.checked=!1,$?.click(),D.checked=!1},te=e=>{document.querySelectorAll("[id^='inicio-card']").forEach(a=>{a.getElementsByTagName("h1")[0].textContent===e?A(a):S(a)})},ae=e=>{document.querySelectorAll("[id^='tecido-card']").forEach(a=>{ee(a).startsWith(e)?A(a):S(a)})},Le=()=>{V.checked=!1,$.checked=!1},z=()=>{let e=document.querySelector("#checkout-window-btn"),t=document.getElementById("window-btns-container");if(p.length===1&&(p[0].button=e,oe(p[0])),p.length>1&&e){let a=e.cloneNode(!0);a.querySelector("h6").textContent=`Janela ${p.length}`,p[p.length-1].button=a,oe(p[p.length-1]),t?.appendChild(a)}},rt=e=>{e.inicio==="Cortina"&&(te(e.inicio),ae(e.tecido),selectTipo(e.tipo),D.checked=e.bainha,v.value=e.medidas.split(" X ")[0],b.value=e.medidas.split(" X ")[1],T.checked=e.correcao,selectSuporte(e.suporte),F.checked=e.instalacao),e.inicio==="Estore"&&(te(e.inicio),ae(e.tecido),v.value=e.medidas.split(" X ")[0],b.value=e.medidas.split(" X ")[1],T.checked=e.correcao,F.checked=e.instalacao)},Ne=e=>{if((e==="largura"||e==="altura")&&(e="medidas"),e!==u&&f[e].classList.contains("done")){switch(De(u),i(m[We(u)],!1),i(u==="calha"?c.tecido:c[u],!1),e){case"tecido":i(m.step1,!0),i(c.tecido,!0);break;case"tipo":i(m.step2,!0),i(c.tipo,!0);break;case"medidas":i(m.step3,!0),i(c.medidas,!0);break;case"calha":i(m.step4,!0),i(c.tecido,!0);break;case"instalacao":i(m.step5,!0),i(c.instalacao,!0);break}u=e,B(e)}},Te=()=>{if(r.inicio==="Cortina")switch(u){case"inicio":k()&&(i(c.inicio,!1),C(!1),i(c.tecido,!0),u="tecido");break;case"tecido":k()&&(x("tecido"),B("tipo"),i(m.step1,!1),C(!1),i(c.tecido,!1),i(m.step2,!0),i(c.tipo,!0),u="tipo");break;case"tipo":k()&&(i(c.tipo,!1),r.tecido.startsWith("120")||r.tecido.startsWith("122")?(h(c.bainha,!0),C(!1),x("tipo"),B("medidas"),i(m.step2,!1),i(m.step3,!0),i(c.medidas,!0),u="medidas"):(i(c.bainha,!0),u="bainha"));break;case"bainha":h(c.bainha,`${r.tecido.startsWith("120")||r.tecido.startsWith("122")?!0:r.bainha?r.bainha:!1}`),x("tipo"),B("medidas"),i(m.step2,!1),i(c.bainha,!1),C(!1),i(m.step3,!0),i(c.medidas,!0),u="medidas";break;case"medidas":k()&&(h(c.medidas,`${v?.value} X ${b?.value}`),i(c.medidas,!1),p.length>0?(C(!1),X("Calha"),x("medidas"),B("calha"),i(m.step3,!1),i(m.step4,!0),i(c.tecido,!0),u="calha"):(i(c.correcao,!0),u="correcao"));break;case"correcao":X("Calha"),x("medidas"),B("calha"),i(m.step3,!1),i(c.correcao,!1),C(!1),i(m.step4,!0),i(c.tecido,!0),u="calha";break;case"calha":k()&&(i(c.tecido,!1),C(!1),Le(),i(c.suporte,!0),u="suporte");break;case"suporte":h(c.suporte,$?.checked?"Parede":"Tecto"),k()&&(x("calha"),B("instalacao"),i(m.step4,!1),i(c.suporte,!1),p.length>0?(_(),z(),R()):(i(m.step5,!0),i(c.instalacao,!0),u="instalacao"));break;case"instalacao":x("instalacao"),i(m.step5,!1),i(c.instalacao,!1),_(),z(),R();break}else switch(u){case"inicio":k()&&(i(c.inicio,!1),i(c.tecido,!0),u="tecido");break;case"tecido":k()&&(x("tecido"),B("medidas"),i(m.step1,!1),i(c.tecido,!1),i(m.step3,!0),i(c.medidas,!0),u="medidas");break;case"medidas":k()&&(h(c.medidas,`${v?.value} X ${b?.value}`),i(c.medidas,!1),p.length>0?(x("medidas"),B("instalacao"),i(m.step3,!1),i(m.step5,!0),i(c.instalacao,!0),u="instalacao"):(i(c.correcao,!0),u="correcao"));break;case"correcao":x("medidas"),B("instalacao"),i(m.step3,!1),i(c.correcao,!1),p.length>0?(_(),z(),R()):(i(m.step5,!0),i(c.instalacao,!0),u="instalacao");break;case"instalacao":x("instalacao"),i(m.step5,!1),i(c.instalacao,!1),_(),z(),R();break}},R=()=>{G.style.display="none",ce(p[p.length-1]),Q.style.display="flex"},Fe=e=>{y.tecido.textContent=e.tecido,y.tipo.textContent=e.tipo,y.bainha.textContent=e.tipo==="Ondas"||p.tipo==="Franzido"?"Ba\xEDnha de Chumbo inclu\xEDda":e.bainha?"Com Ba\xEDnha de Chumbo":"Sem Ba\xEDnha de Chumbo",y.largura.textContent=e.medidas.split(" X ")[0]+"cm Largura",y.altura.textContent=e.medidas.split(" X ")[1]+"cm Altura",y.correcao.textContent=p[0].correcao?"Com Verifica\xE7\xE3o":"Sem Verifica\xE7\xE3o",y.calha.textContent=e.calha,y.suporte.textContent="Suporte de "+e.suporte,y.instalacao.textContent=p[0].instalacao?"Com Instala\xE7\xE3o":"Sem Instala\xE7\xE3o"},ce=e=>{p.forEach(t=>{t.button&&t.button.classList.remove("active")}),e.button.classList.add("active"),Fe(e)},ie=e=>{switch(Q.style.display="none",Ae(),G.style.display="flex",(e==="largura"||e==="altura")&&(e="medidas"),e){case"inicio":i(m.step1,!0),i(c.inicio,!0);break;case"tecido":i(m.step1,!0),i(c.tecido,!0);break;case"tipo":i(m.step2,!0),i(c.tipo,!0);break;case"medidas":i(m.step3,!0),i(c.medidas,!0);break;case"calha":i(m.step4,!0),i(c.tecido,!0);break;case"instalacao":i(m.step5,!0),i(c.instalacao,!0);break}if(u=e,u==="inicio")return B("tecido");B(e)},Oe=()=>{let{jsPDF:e}=window.jspdf,t=new e,a=10,s=190,o=10,l=6,d=0;t.setFontSize(12),t.text("Data: "+new Date().toLocaleDateString(),s-40,o),t.text("Cliente: "+r.nome,a,o),o+=l,t.text("Email: "+r.email,a,o),o+=l*2,p.forEach((n,E)=>{E%6===0&&E!==0&&(t.addPage(),o=10);let{usedWidth:J,productPrice:I,manufacturingPrice:L,bainhaPrice:Z,calhaPrice:N,instalationPrice:U,windowTotal:ne}=ct(n);d+=ne;let it=`Janela ${E+1} - ${n.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(J).toFixed(2))} CM)`;t.setFontSize(10),t.text(it,a,o),t.text(`${ne.toFixed(2)}\u20AC`,a+150,o),o+=l,[{label:`Tecido: ${n.tecido}`,price:I},{label:`Tipo de Cortina: ${n.tipo}`,price:L},{label:`Ba\xEDnha de Chumbo: ${n.tecido.startsWith("120")||n.tecido.startsWith("122")?"Inclu\xEDda":n.bainha?"Sim":"N\xE3o"}`,price:Z},{label:`Calha: ${n.calha} - Suporte: Suporte de ${n.suporte}`,price:N},{label:`Instala\xE7\xE3o: ${p[0].instalacao?"Sim":"N\xE3o"}`,price:U}].forEach(se=>{t.setFontSize(8),t.text(`  - ${se.label}`,a+5,o),t.text(`${se.price.toFixed(2)}\u20AC`,a+150,o),o+=l}),o+=l}),!p.length===6&&(o+=l),t.setFontSize(10),t.text("Corre\xE7\xE3o:",a,o),t.text(`${p[0].correcao?30:0}\u20AC`,a+150,o),o+=l,o+=l,d+=p[0].correcao?30:0,t.setFontSize(10),t.setFont("helvetica","bold"),t.setFillColor(240,240,240),t.rect(a,o,190,l+2,"F"),t.text("Total:",a+120,o+l-2),t.text(`${d.toFixed(2)}\u20AC`,a+150,o+l-2),t.save("generated.pdf")},i=(e,t)=>{e.style.display=t?"flex":"none"},Ae=()=>{Object.keys(f).forEach(e=>{f[e].classList.remove("active"),f[e].classList.add("next"),f[e].classList.remove("done"),f[e].getElementsByClassName("step_number")[0].classList.remove("active"),f[e].getElementsByClassName("step_description")[0].textContent="Escolha"})},x=e=>{f[e].classList.remove("active"),f[e].classList.remove("next"),f[e].classList.add("done"),f[e].getElementsByClassName("step_number")[0].classList.remove("active"),f[e].getElementsByClassName("step_description")[0].textContent=r[e],e==="medidas"&&(f[e].getElementsByClassName("step_description")[0].textContent+=r.correcao?"c/Verifica\xE7\xE3o":"s/Verifica\xE7\xE3o"),e==="tipo"&&(f[e].getElementsByClassName("step_description")[0].textContent+=r.bainha?"c/Ba\xEDnha de Chumbo":"s/Ba\xEDnha de Chumbo")},B=e=>{f[e].classList.remove("next"),f[e].classList.add("active"),f[e].getElementsByClassName("step_number")[0].classList.add("active")},De=e=>{if(f[e].classList.contains("active")&&(f[e].classList.remove("active"),f[e].getElementsByClassName("step_number")[0].classList.remove("active")),f[e].classList.contains("done"))return x(e);f[e].classList.add("next")},C=e=>{e&&O?.classList.contains("inactive")&&O.classList.remove("inactive"),e||O?.classList.contains("inactive")||O.classList.add("inactive")},H=e=>{e.classList.add("active")},j=e=>{e.classList.remove("active")},A=e=>{let t=e.getElementsByTagName("h1")[0],a=e.getElementsByClassName("tecido_image_contain")[0];e.classList.add("selected"),t.classList.add("active"),a.classList.add("active")},S=e=>{let t=e.getElementsByTagName("h1")[0],a=e.getElementsByClassName("tecido_image_contain")[0];e.classList.remove("selected"),t.classList.remove("active"),a.classList.remove("active")},Ve=()=>{let e=document.querySelectorAll("[id^='inicio-card']");e.forEach(t=>{t.addEventListener("click",()=>{let a=t.getElementsByTagName("h1")[0].textContent;A(t,c.inicio),e.forEach(s=>{s!==t&&S(s)}),X(a),h(c.inicio,a),k()&&C(!0)})})},_e=()=>{let e=document.querySelectorAll("[id^='tecido-card']"),t=document.querySelectorAll(".tecido_color");e.forEach(a=>{a.addEventListener("click",()=>{let s=ee(a),o=Se(a),l=q.find(n=>n.product===s),d=a.getElementsByClassName("tecido_color");if(t.forEach(n=>j(n)),A(a,c.tecido),e.forEach(n=>{n!==a&&S(n)}),l){for(let n=0;n<d.length;n++)d.item(n).id===`${l.color}`&&H(d.item(n));u==="tecido"&&h(c.tecido,l.color),u==="calha"&&M(l.color)}else d.length>0&&H(d[0]),u==="tecido"&&o!==""&&h(c.tecido,`${o}`),u==="calha"&&o!==""&&M(o);k()&&C(!0)})})},Xe=()=>{let e=document.querySelectorAll(".tecido_color");e.forEach(t=>{t.addEventListener("click",a=>{let s=a.currentTarget,o=s&&s.id;H(s),e.forEach(E=>{E!==s&&j(E)});let l=o?o.split("-")[0]:"",d=q.find(E=>E.product===l);d?d.color=`${o}`:q.push({product:l,color:`${o}`});let n=s.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("tecido_image")[0];for(let E=0;E<e.length;E++)if(e[E].getAttribute("id")===o){n.setAttribute("src",e[E].getElementsByTagName("img")[0].getAttribute("src")),n.setAttribute("srcset","");break}return u==="calha"&&o!==""?M(o):u==="tecido"&&o!==""?h(c.tecido,o):console.log("No color was stored")})})},ze=()=>{let e=document.querySelectorAll("[id^='tipo-card']");e.forEach(t=>{t.addEventListener("click",()=>{A(t,c.tipo),e.forEach(a=>{a!==t&&S(a)}),h(c.tipo,t.getElementsByTagName("h1")[0].textContent),k()&&C(!0)})})},Re=()=>{D.addEventListener("change",function(e){h(c.bainha,D.checked)})},qe=()=>{$?.addEventListener("change",e=>{($?.checked===!0||V?.checked===!0)&&(w("Parede"),k()&&C(!0))}),V?.addEventListener("change",e=>{($?.checked===!0||V?.checked===!0)&&(w("Tecto"),k()&&C(!0))})},Me=()=>{v?.addEventListener("input",e=>{v?.value===""&&b?.value===""||parseInt(v?.value)<=g.minWindowWidth||parseInt(b?.value)<=g.minWindowHeight||(v?.value!==""&&b?.value!==""&&h(c.medidas,`${v?.value} X ${b?.value}`),v?.value!==""&&b?.value!==""&&(k()?C(!0):C(!1)))}),b?.addEventListener("input",e=>{v?.value===""&&b?.value===""||parseInt(v?.value)<=g.minWindowWidth||parseInt(b?.value)<=g.minWindowHeight||(v?.value!==""&&b?.value!==""&&h(c.medidas,`${v?.value} X ${b?.value}`),v?.value!==""&&b?.value!==""&&(k()?C(!0):C(!1)))})},He=()=>{T.addEventListener("change",function(e){h(c.correcao,T.checked)})},je=()=>{F.addEventListener("change",function(e){h(c.instalacao,F.checked)})},Je=()=>{Object.keys(f).forEach(e=>{f[e].addEventListener("click",()=>{Ne(e)})})},Ze=()=>{Object.keys(y).forEach(e=>{y[e].addEventListener("click",()=>{ie(e)})})},oe=e=>{e.button.addEventListener("click",()=>{ce(e)})},Ue=()=>{fe.addEventListener("click",()=>{r.nome=re.value,r.email=le.value,r.contacto=de.checked,Oe()})},Ke=()=>{he.addEventListener("click",ye)},Ye=()=>{pe.addEventListener("click",()=>{ue.style.display="none",me.style.display="flex"})},Ge=()=>{O.addEventListener("click",Te)},Qe=e=>{let t=g.usedWidths.find(a=>e.tipo===a.name);return t?(e.medidas?parseInt(e.medidas.split(" X ")[0]):0)*t.widthRatio+g.bainhaPrice.widthMargin:0},we=(e,t)=>{let a=e.medidas.split(" X ")[0],s=0,o=0,l=ke(e);return e.inicio==="Cortina"&&(s=l.product*(t/100),o=l.calha),e.inicio==="Estore"&&(s=l.product),{product:s,calha:o}},et=(e,t)=>{if(e.inicio==="Estore")return 0;let a=g.manufacturingPrices.find(s=>e.tipo===s.name);return a?e.tecido.startsWith("101")?a.blackout*(t/100):a.normal*(t/100):0},tt=(e,t)=>e.inicio==="Cortina"&&(e.tecido.startsWith("120")||e.tecido.startsWith("122"))||e.inicio==="Estore"?0:e.bainha?g.bainhaPrice.price*(t/100):0,lt=e=>e.correcao?g.measuresCheckPrice:0,at=e=>{if(!p[0].instalacao)return 0;let t=parseInt(e.medidas.split(" X ")[0]),a=g.instalation.find(s=>t<=s.maxWidth);return a?a.price:0},ct=e=>{let t=Qe(e),a=we(e,t),s=et(e,t),o=tt(e,t),l=at(e),d=a.product+s+o+a.calha+l;return e.totalPrice=d,{usedWidth:t,productPrice:a.product,manufacturingPrice:s,bainhaPrice:o,calhaPrice:a.calha,instalationPrice:l,windowTotal:d}};be()});})();
