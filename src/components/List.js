import React from 'react';

const defaultProps = {
  items: [],
  timeArr: [],
}

const List = props => (
  <>
    <ul>{props.items.map((item, index) => <li className={"task"} key={index}>{item}</li>)}</ul>
    <ul>
      {props.timeArr.map((item, index) => <li className={"time"} key={index}>
        {(Math.floor(item / 3600000)).toString().slice(-2)} : {(Math.floor(item / 60000) % 60).toString().slice(-2)} : {(Math.floor(item / 1000) % 60).toString().slice(-2)}</li>)}
    </ul>
  </>
);

List.defaultProps = defaultProps;
export default List;