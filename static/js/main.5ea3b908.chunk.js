(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,n){e.exports=n(49)},38:function(e,t,n){},41:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(9),l=n.n(r),o=(n(36),n(37),n(38),n(10)),c=n(11),u=n(14),i=n(12),d=n(15),h=n(3),m=n(56),p=n(53),S=n(54),b=n(60),v=n(57),f=n(58),w=n(59),q=n(27),g=n(29),E=n(30),k=n(7),y=n(55),O=n(50),j=n(61),x=n(51),D=n(52),C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(u.a)(this,Object(i.a)(t).call(this,e))).state={selectedSoundIdx:0,dropDownHover:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e,t,n){if(t.selectedSoundIdx!==this.state.selectedSoundIdx){var a=this.props.row-1;this.props.handleSoundSelect(a,this.state.selectedSoundIdx)}}},{key:"changeSelectedSound",value:function(e,t){this.setState({selectedSoundIdx:t}),this.props.handleSoundSelect(e,t)}},{key:"render",value:function(){var e=this,t=this.props.sounds,n=this.props.row-1,a=t.map(function(t,a){return s.a.createElement(O.a,{key:a,active:e.state.selectedSoundIdx===a,onClick:function(){return e.changeSelectedSound(n,a)}},t)});return s.a.createElement(j.a,{size:"sm"},s.a.createElement(x.a,{caret:!0,className:this.state.dropDownHover?null:"shadow-none",onMouseEnter:function(){return e.setState(function(e){return{dropDownHover:!e.dropDownHover}})},onMouseLeave:function(){return e.setState(function(e){return{dropDownHover:!e.dropDownHover}})},style:{backgroundColor:"white",border:"1px solid #1A163D",color:"#1A163D",borderRadius:"0px",boxShadow:this.state.dropDownHover?"3px 3px #1A163D":null,transition:"box-shadow 0.2s ease-in-out"}},t[this.state.selectedSoundIdx]),s.a.createElement(D.a,null,a))}}]),t}(a.Component),N=n(17);function I(e){var t=e.sounds,n=e.handleSoundSelect,a=e.activeStep,r=e.seqRow,l=e.addSound,o=e.row,c=e.steps,u=e.isHeader,i=[],d=0;if(void 0!==u&&u){for(i.push(s.a.createElement("th",{style:{border:"1px solid #1A163D",backgroundColor:"white"},key:"header-none"}));d<c;)i.push(s.a.createElement("th",{style:{border:"1px solid #1A163D",backgroundColor:d===a?"#FFFBC7":"white"},key:"header-"+d+1},d+1)),d++;return s.a.createElement("tr",null,i)}for(;d<c;)i.push(s.a.createElement("td",{key:o+"-"+d,onClick:l,id:o+"-"+d,style:{cursor:"pointer",border:"1px solid #1A163D",backgroundColor:null!==r[d]?"#E07D7E":"white"}})),d++;return s.a.createElement("tr",null,s.a.createElement("th",{style:{border:"1px solid #1A163D",backgroundColor:"white"},scope:"row"},"Track ",o,s.a.createElement(C,{row:o,sounds:t,handleSoundSelect:n})),i)}function H(e){for(var t=[],n=1;n<=e.rows;)t.push(s.a.createElement(I,{key:n,sounds:e.sounds,handleSoundSelect:e.handleSoundSelect,activeStep:e.activeStep,seqRow:e.sequencer[n-1].rowSeq,addSound:e.addSound,row:n,steps:e.steps})),n++;return t}var A=function(e){function t(e){var n;Object(o.a)(this,t);return(n=Object(u.a)(this,Object(i.a)(t).call(this,e))).state={isDefaultState:!0,isPlaying:!1,bpm:240,activeStep:0,sequencer:new Array(2).fill({rowSeq:new Array(6).fill(null),rowSoundEngine:new N.Howl({src:[n.props.soundUrls[0]]})})},n.stopSequencer=n.stopSequencer.bind(Object(h.a)(Object(h.a)(n))),n.clearSequencer=n.clearSequencer.bind(Object(h.a)(Object(h.a)(n))),n.resetSequencer=n.resetSequencer.bind(Object(h.a)(Object(h.a)(n))),n.addSound=n.addSound.bind(Object(h.a)(Object(h.a)(n))),n.handleSoundSelect=n.handleSoundSelect.bind(Object(h.a)(Object(h.a)(n))),n.handleBPMChange=n.handleBPMChange.bind(Object(h.a)(Object(h.a)(n))),n.rows=2,n.steps=6,n.soundEngines=n.props.soundUrls.map(function(e){return new N.Howl({src:[e]})}),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"addTrack",value:function(){var e=this.state.sequencer.map(function(e){return Object(k.a)({},e)});e.push({rowSeq:new Array(e[0].rowSeq.length).fill(null),rowSoundEngine:null}),e.length>=9?alert("Maximum Number of Tracks: 8"):this.setState({sequencer:e})}},{key:"addStep",value:function(){var e=this.state.sequencer.map(function(e){return Object(k.a)({},e)});for(var t in e)e[t].rowSeq=[].concat(Object(E.a)(e[t].rowSeq),[null]);e[0].rowSeq.length>=17?alert("Maximum Number of Steps: 16"):this.setState({sequencer:e})}},{key:"handleSoundSelect",value:function(e,t){var n=this.state.sequencer.map(function(e){return Object(k.a)({},e)});n[e].rowSoundEngine=this.soundEngines[t],this.setState({sequencer:n})}},{key:"componentDidUpdate",value:function(e,t,n){if(t.activeStep!==this.state.activeStep)for(var a in this.state.sequencer)null!==this.state.sequencer[a].rowSeq[this.state.activeStep]&&null!==this.state.sequencer[a].rowSoundEngine&&this.state.sequencer[a].rowSoundEngine.play()}},{key:"playSequencer",value:function(e){var t=this;this.setState({isDefaultState:!1}),this.setState({isPlaying:!0});var n=this.state.sequencer[0].rowSeq.length,a=6e4/e;this.activeStepID=setInterval(function(){return t.setState(function(e){return{activeStep:(e.activeStep+1)%n}})},a)}},{key:"stopSequencer",value:function(){this.setState({isPlaying:!1}),clearInterval(this.activeStepID)}},{key:"clearSequencer",value:function(){this.setState({isDefaultState:!0}),this.setState({isPlaying:!1}),clearInterval(this.activeStepID),this.setState({activeStep:0});var e=this.state.sequencer.map(function(e){return Object(k.a)({},e)});for(var t in e)e[t].rowSeq=e[t].rowSeq.fill(null);this.setState({sequencer:e})}},{key:"resetSequencer",value:function(){this.setState({isDefaultState:!0}),this.setState({isPlaying:!1}),clearInterval(this.activeStepID),this.setState({activeStep:0});var e=new Array(this.rows).fill({rowSeq:new Array(this.steps).fill(null),rowSoundEngine:new N.Howl({src:[this.props.soundUrls[0]]})});this.setState({sequencer:e})}},{key:"addSound",value:function(e){var t=e.target.id.split("-"),n=Object(g.a)(t,2),a=n[0],s=n[1],r=this.state.sequencer[a-1].rowSeq.slice();r[s]=null===r[s]?"x":null;var l=this.state.sequencer.map(function(e){return Object(k.a)({},e)});l[a-1].rowSeq=r,this.setState({sequencer:l})}},{key:"componentWillUnmount",value:function(){clearInterval(this.activeStepID)}},{key:"handleBPMChange",value:function(e){this.setState({bpm:e.target.value})}},{key:"render",value:function(){var e=this,t=this.state.sequencer[0].rowSeq.length,n=this.state.sequencer.length;return s.a.createElement(a.Fragment,null,s.a.createElement(p.a,null,s.a.createElement(S.a,null,s.a.createElement(y.a,{className:"mt-3 mb-5",style:{boxShadow:"4px 4px #1A163D"}},s.a.createElement("thead",null,s.a.createElement(I,{activeStep:this.state.activeStep,steps:t,isHeader:!0})),s.a.createElement("tbody",null,s.a.createElement(H,{activeStep:this.state.activeStep,sounds:this.props.sounds,handleSoundSelect:this.handleSoundSelect,sequencer:this.state.sequencer,addSound:this.addSound,rows:n,steps:t}))))),s.a.createElement(p.a,{className:"mb-3"},s.a.createElement(S.a,null,s.a.createElement("button",{className:"mr-3 sequencer-button",onClick:this.resetSequencer},"Reset"),s.a.createElement("button",{className:"ml-3 mr-3 sequencer-button",onClick:this.clearSequencer},"Clear"),s.a.createElement("button",{className:"ml-3 mr-3 sequencer-button text-danger",onClick:this.stopSequencer},"Stop"),s.a.createElement("button",{className:"ml-3 sequencer-button text-success",onClick:function(){return e.playSequencer(e.state.bpm)}},"Play"))),s.a.createElement(p.a,{className:"mb-3"},s.a.createElement(S.a,null,s.a.createElement("button",{className:"m-3 sequencer-button",onClick:function(){return e.addTrack()}},s.a.createElement("i",{className:"fa fa-plus-circle"})," Tracks"),s.a.createElement("button",{className:this.state.isDefaultState?"m-3 sequencer-button":"d-none m-3 sequencer-button",onClick:function(){return e.addStep()}},s.a.createElement("i",{className:"fa fa-plus-circle"})," Steps"))),s.a.createElement(p.a,{className:this.state.isPlaying?"d-none":null},s.a.createElement(S.a,{xs:"2"},s.a.createElement("h5",null,"Bpm")),s.a.createElement(S.a,{xs:"8",className:"bpm"},s.a.createElement("input",{className:"bpm-slider",type:"range",min:60,max:700,value:this.state.bpm,onChange:this.handleBPMChange})),s.a.createElement(S.a,{xs:"2"},s.a.createElement("h5",null,this.state.bpm))))}}]),t}(a.Component),M=(n(41),["Kick","Snare","Castanets","Cymbals","Tambourine","Woodblock"]),P=["https://osquibb.github.io/public/sounds/kick.mp3","https://osquibb.github.io/public/sounds/snare.mp3","https://osquibb.github.io/public/sounds/castanets.mp3","https://osquibb.github.io/public/sounds/cymbals.mp3","https://osquibb.github.io/public/sounds/tambourine.mp3","https://osquibb.github.io/public/sounds/woodblock.mp3"],B=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(u.a)(this,Object(i.a)(t).call(this,e))).state={modal:!0},n.toggleModal=n.toggleModal.bind(Object(h.a)(Object(h.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"toggleModal",value:function(){this.setState({modal:!1})}},{key:"render",value:function(){return s.a.createElement(a.Fragment,null,s.a.createElement(m.a,null,s.a.createElement(p.a,{className:"text-center mt-4"},s.a.createElement(S.a,null,s.a.createElement("h2",null,"Step Sequencer"))),s.a.createElement(A,{sounds:M,soundUrls:P})),s.a.createElement(b.a,{isOpen:this.state.modal,toggle:this.toggleModal},s.a.createElement(v.a,{toggle:this.toggle},"How to Play"),s.a.createElement(f.a,{className:"text-left"},s.a.createElement("ol",null,s.a.createElement("li",null,"Click on cells in the sequencer"),s.a.createElement("li",null,"Then press play!")),s.a.createElement("p",null,"(Hint: Try adding tracks and changing the sounds!)")),s.a.createElement(w.a,null,s.a.createElement(q.a,{color:"info",outline:!0,onClick:this.toggleModal},"Got it!"))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.5ea3b908.chunk.js.map