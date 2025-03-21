import React, { Component } from 'react';
import TerminalWindow from './components/TerminalWindow';
const QUESTIONS = require('./data/questions.js').questions;
const version = require('./data/questions.js').version;
const versionString = `C4S version ${version}`;

const myData = JSON.parse(localStorage.getItem('tachyonsQuiz')) || { score: 0, log: [], questions: [] };

class App extends Component {
  render() {
    return (
      <div className="vh-100 pv3 ph2 ph3-s p4-m mw8 center">
        <h1 className="f3 mt3 mb4 sans-serif" title={versionString}>
          Are you a C4S Pro?
        </h1>

        <p className="f5 mt4 mb5 sans-serif">
          Learn C4S by memorizing the class names.
          {' '}
          <a
            href="http://c4s.cdijkman.nl"
            target="_blank"
            className="blue"
            rel="noopener noreferrer"
          >
            What is C4S?
          </a>
        </p>

        <TerminalWindow questions={QUESTIONS} myData={myData} />

        <p className="f6 sans-serif mt5">
          <a
            href="https://tachyonspro.netlify.app/"
            target="_blank"
            className="blue"
            rel="noopener noreferrer"
            data-tooltip="Tachyons Pro"
          >
            Original app
          </a>
          {' '}
          developed by:
          {' '}
          <a
            href="https://twitter.com/mkwng/"
            target="_blank"
            className="blue"
            rel="noopener noreferrer"
            data-tooltip="Michael Wang"
          >
            @mkwng
          </a>
        </p>
      </div>
    );
  }
}

export default App;
