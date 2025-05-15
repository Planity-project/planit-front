import styled from "styled-components";

export const CustomTimeSelect = styled.div`
  display: flex;
  gap: 6px;
  position: relative;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
`;

export const SelectBox = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Selected = styled.div`
  padding: 4px 8px;
  background: white;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 160px;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const DropdownItem = styled.div`
  padding: 6px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(83, 183, 232, 0.6);
    color: white;
  }
`;
