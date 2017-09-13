import React, { Component } from 'react';
import marked from 'marked';
import MarkdownPreviewer from './MarkdownPreviewer';

class MarkdownEditor extends Component {
	constructor() {
		super();

		this.handleInputChange = this.handleInputChange.bind(this);
		this.transformInputToMarkdown = this.transformInputToMarkdown.bind(this);
		this.fullscreenPreviewer = this.fullscreenPreviewer.bind(this);
		this.fullscreenEditor = this.fullscreenEditor.bind(this);

		this.state = {
			input: `# This is the markdown editor \n## This is a sub header`,
			markdown: '',
			markdownPreviewFullscreen: false,
			markdownEditorFullscreen: false,
			markdownPreviewStyle: 'visible',
			markdownEditorStyle: 'markdown--editor flex'
		};
	}
	componentDidMount() {
		this.transformInputToMarkdown(this.state.input);
	}
	handleInputChange(event) {
		this.setState({ input: event.target.value });
		this.transformInputToMarkdown(this.state.input);
	}
	transformInputToMarkdown() {
		const markdown = marked(this.state.input);
		this.setState({ markdown: markdown });
	}
	fullscreenPreviewer() {
		this.setState({ markdownPreviewFullscreen: !this.state.markdownPreviewFullscreen }, () => {
			if (this.state.markdownPreviewFullscreen) {
				this.setState({ markdownPreviewStyle: 'visible fullscreen' });
				this.setState({ markdownEditorStyle: 'markdown--editor' });
			} else {
				this.setState({ markdownPreviewStyle: 'visible' });
				this.setState({ markdownEditorStyle: 'markdown--editor flex' });
			}
		});
	}
	fullscreenEditor() {
		this.setState({ markdownEditorFullscreen: !this.state.markdownEditorFullscreen }, () => {
			if (this.state.markdownEditorFullscreen) {
				this.setState({ markdownEditorStyle: 'markdown--editor flex fullscreen' });
				this.setState({ markdownPreviewStyle: '' });
			} else {
				this.setState({ markdownEditorStyle: 'markdown--editor flex' });
				this.setState({ markdownPreviewStyle: 'visible' });
			}
		});
	}
	render() {
		return (
			<div className="markdown--wrapper">
				<div className={this.state.markdownEditorStyle}>
					<div className="markdown--editor--header">
						<i className="fa fa-arrows-alt" aria-hidden="true" onClick={this.fullscreenEditor} />
					</div>
					<textarea
						className="markdown--textarea"
						id="editor"
						defaultValue={this.state.input}
						onKeyUp={this.handleInputChange}
						onChange={this.handleInputChange}
					/>
				</div>
				<MarkdownPreviewer
					content={this.state.markdown}
					classes={this.state.markdownPreviewStyle}
					fullscreen={this.fullscreenPreviewer}
				/>
			</div>
		);
	}
}

export default MarkdownEditor;
