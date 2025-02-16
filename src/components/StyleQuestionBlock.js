import React from 'react';

const StyleQuestionBlock = React.createClass({
  getInitialState: function () {
    return {
      answer: this.props.answer || ''
    };
  },

  componentDidMount: function () {
    setTimeout(function () {
      if (this.textInput) this.textInput.focus();
      this.updateCssHighlighting();
    }.bind(this), 50);
  },

  componentDidUpdate: function () {
    setTimeout(function () {
      this.updateCssHighlighting();
    }.bind(this), 50);
  },

  updateCssHighlighting() {
    const highlightSet = document.querySelectorAll('code.language-css');
    Array.from(highlightSet).forEach((element) => {
      // querySelector hack to avoid highlighting all code blocks again every call ¯\_(ツ)_/¯
      if ('Prism' in window && !Boolean(element.querySelector('span'))) {
        window.Prism.highlightElement(element);
      }
    })
  },

  onAnswerChange: function (e) {
    this.setState({ answer: e.target.value });
    e.target.style.width = `${Math.max(e.target.value.length, 1) + 2}ch`;
  },

  onSubmit: function (e) {
    e.preventDefault();
    this.setState({ answer: '' });
    this.textInput.style.width = '1ch';
    return this.props.onAnswer(this.state.answer);
  },

  clickPre: function () {
    if (this.props.isEditable) {
      if (this.textInput) this.textInput.focus();
    }
  },

  render: function () {
    const isCorrect = Array.isArray(this.props.tachyonsStyle.answer)
      ? this.props.tachyonsStyle.answer.includes(this.props.answer)
      : this.props.tachyonsStyle.answer === this.props.answer;
    const comment = (
      <code className="db w-100 grey2">
        {'// '}
        {this.props.tachyonsStyle.categories[0]}
        {' ('}
        <a
          className="grey2"
          target="_blank"
          href={this.props.tachyonsStyle.url}
          rel="noopener noreferrer"
        >
          See documentation
        </a>
        {')'}
      </code>
    );
    const selector = this.props.isEditable
      ? (
        <code className="db w-100 bg-white-03">
          <form onSubmit={this.onSubmit} className="dib green">
            .<input
              className="ph1 w2 outline-0 bn p0 bg-transparent green"
              type="text"
              value={this.state.answer}
              onChange={this.onAnswerChange}
              ref={(input) => { this.textInput = input; }}
              autoCorrect="off"
              autoCapitalize="off"
            />
          </form>
          {' {'}
        </code>
      ) : (
        <code className={isCorrect ? 'correct db w-100' : 'wrong db w-100'}>
          <span className={isCorrect ? 'green' : 'bg-red white'}>
            .{this.props.answer}
            <i className="material-icons ph1 v-btm">{isCorrect ? 'check_circle' : 'error'}</i>
          </span>
          {' { '}
          <span className={isCorrect ? 'dn grey2' : 'di grey2'}>
            {' // Correct answer: ' + this.props.tachyonsStyle.answer}
          </span>
        </code>
      );
    const property = (
      this.props.tachyonsStyle.question.split('\n').map((questionLine, index) =>
        <code
          className="db w-100 language-css"
          key={index}
          data-highlighted="false"
        >
          {questionLine}
        </code>
      )
    );
    return (
      <pre className="w-100 tl mv0" onClick={this.clickPre} >
        <code className="db w-100">{' '}</code>
        {comment}
        {selector}
        {property}
        <code className="db w-100">{'}'}</code>
      </pre>
    );
  }
});

export default StyleQuestionBlock;
