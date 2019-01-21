import React from 'react';
import { Link } from 'react-router-dom'
import FontAwesome from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag'

const MyButton = (props) => {
  const buttons = () => {
    let template = '';

    switch(props.type) {
      case "default":
        template = <Link
          className={props.altClass ? props.altClass : 'link_deault'}
          to={props.linkTo}
          {...props.addStyle}
        >
          {props.title}
        </Link>
        break;
      case "bag_link":
        template = 
          <div className="bag_link" onClick={() => props.runAction()}>
            <FontAwesome 
              icon={faShoppingBag}
            />
          </div>
        break;
      default:
        template = '';
    }

    return template;
  }

  return (
    <div className="my_link">
      {buttons()}
    </div>
  );
};

export default MyButton;