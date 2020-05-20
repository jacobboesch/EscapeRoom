// import global dependencies
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import semanticCSS from 'semantic-ui-css/semantic.min.css';
import semantic from 'semantic-ui-css';
import EscapeRoom from "./EscapeRoom" 

const getParams = window.location.search;
const params = new URLSearchParams(getParams);
let escapeRoomURL = params.get('escapeRoom');

let room = new EscapeRoom(escapeRoomURL); 

room.build();