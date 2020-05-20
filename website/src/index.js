// import global dependencies
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import semanticCSS from 'semantic-ui-css/semantic.min.css';
import semantic from 'semantic-ui-css';
import EscapeRoom from "./EscapeRoom" 


let room = new EscapeRoom('./test.json'); 

room.build();