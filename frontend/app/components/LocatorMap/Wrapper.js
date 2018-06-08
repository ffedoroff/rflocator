import { Map } from 'react-leaflet';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
    0% {
      transform: translate(0px, 0px) rotate(-3deg);
    }
    20% {
      transform: translate(0px, -1px) rotate(3deg);
    }
    40% {
      transform: translate(0px, 1px) rotate(0deg);
    }
    60% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    80% {
      transform: translate(-1px, 0px) rotate(0deg);
    }
    100% {
      transform: translate(1px, 0px) rotate(0deg);
    }
`;

export default styled(Map)`
  width: 100%;
  
  .icon {
    border: 1px solid #666;
    border-radius: 50px;
    opacity: 0.8;
    
    .car:before {
      font: normal normal normal 28px fontawesome;
      text-shadow: 2px 2px 9px #000000, -2px -2px 9px #000000, 0 0 9px #000000;
      text-align: center;
      content: "\\f1b9";
    }
  
    &.TIMER {
      color: #3BFF00;
      background-color: #3BFF00;
      .car {
        animation: ${shake} 1.5s;
        animation-iteration-count: infinite;
      }
    }
    
    &.WAKE {
      color: #9fbbff;
      background-color: #9fbbff;
    }
    
    &.SLEEP {
      color: #a3a3a3;
      background-color: #a3a3a3;
    }
    
    &.selected {
      opacity: 1;
      border-style: none;
      border-radius: 0;
      background-color: transparent;
      z-index: 9999 !important;
    }
    
    &.hovered, &:hover {
      opacity: 1;
      z-index: 10000 !important;
    }
  }
`;
