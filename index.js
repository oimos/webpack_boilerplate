import './style.css';//without this it would not generate style.css inside dist directory

import React from 'react';
import ReactDOM from 'react-dom';


const Index = React.createClass({
	render: function(){
		return(
			<p>Index</p>
		);
	}
});

ReactDOM.render(
	<Index />,
	document.getElementById('box')
);
