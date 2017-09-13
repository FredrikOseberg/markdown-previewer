import React from 'react';

const MarkdownPreviewer = props => {
	return (
		<div id="preview" className={props.classes}>
			<div className="markdown--preview--header">
				<i className="fa fa-ellipsis-h" aria-hidden="true" />
				<i className="fa fa-arrows-alt" aria-hidden="true" onClick={props.fullscreen} />
			</div>
			<div className="markdown--preview--content" dangerouslySetInnerHTML={{ __html: props.content }} />
		</div>
	);
};

export default MarkdownPreviewer;
