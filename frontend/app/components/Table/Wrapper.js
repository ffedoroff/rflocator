import styled from 'styled-components';

export default styled.table`
  width: 100%;

  td {
    padding-left:3px;
    color: #212529;
    text-align: left;
    border-top: 1px solid #dee2e6;
  }
  th {  
    text-align: left;
    color: #fff;
    background-color: #212529;
    border-color: #32383e;
  }
  
  tbody tr:hover, tr.hovered {
    color: #495057;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }
  
  tr.selected {
    color: #495057;
    background-color: #e2dbd4;
    border-color: #e2dbd4;
  }
`;
