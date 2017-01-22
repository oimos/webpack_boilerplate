import './style.css';//without this it would not generate style.css inside dist directory

import React from 'react';
import ReactDOM from 'react-dom';


const Index = React.createClass({
	render: function(){
		return(
			<p>contact</p>
		);
	}
});

ReactDOM.render(
	<Index />,
	document.getElementById('box')
);

alert('my name is ' + shinya + '-san');