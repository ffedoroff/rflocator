import styled from 'styled-components';

export default styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  text-align: right;
  background-color: #212529;
  color: #e2dbd4;
  border-radius: 0 0 0 10px;
  white-space: nowrap;
  
  .floated, > button {
    text-align: center;
    display: block;
    width: 75px;
    clear: both;
    float: right;
  }
  
  button {   
    font: bold normal normal 55px fontawesome;
  }
  
  .refresh:before {
    content: "\\f021";
  }
  
  .toggle:before {
    content: "\\f022";
  }
   
  .pager {
    text-align: right;
    font-size: 0.7em;
    padding-bottom: 0.7em;    
  }
  
  button:disabled, select:disabled {
    color: #674646;
  }
`;
