import React from 'react';
import Head from 'next/head';
import jQuery from 'jquery';
import questions from '../src/questions.js'

var _ = require('lodash');
// var css = require("!style!css!../src/index.css");

var StyleQuestionBlock = require('../components/StyleQuestion.js').StyleQuestionBlock;
var StyleQuestionLog = require('../components/StyleQuestion.js').StyleQuestionLog;


var Application = React.createClass({
  getInitialState: function() {
    var initialData = this.props.myData || { score:0, log:[], questions:[] };
    initialData.questions = initialData.questions.length 
      ? _.orderBy(_.shuffle(initialData.questions), ['seen', 'proficiency'], ['asc', 'asc'])
      : this.addQuestion(5, initialData.questions);
    return {
      data: initialData,
      currentQuestionID: initialData.questions[0].id,
      previousQuestionID: null,
    };
  },

  onAnswer: function(userAnswer) {
    var question = _.find(this.state.data.questions, { id: this.state.currentQuestionID });
    var tachyonsStyle = _.find(this.props.questions, { id: this.state.currentQuestionID });
    question.seen += 1;

    if (userAnswer === tachyonsStyle.answer) {
      console.log("Correct");
      question.proficiency += 1;
      question.correct += 1;
      this.state.score += 1;
    } else {
      console.log("Wrong");
      question.proficiency = Math.max(question.proficiency - 1, 0);
    }

    // Change question
    this.state.data.log.push({
      id: this.state.data.log.length,
      tachyonsStyle: tachyonsStyle,
      answer: userAnswer
    });
    this.state.currentQuestionID = this.nextQuestionID();
    this.setState(this.state);
  },

  addQuestion: function(num, target) {
    var num = num ? num : 1;
    var isTarget = target ? true : false;
    target = target || this.state.data.questions;

    // Query for random array with answered questions filtered out
    var answered = _.map(target, 'id');
    var filteredQuestions = _.pickBy(this.props.questions, function(value, key) {
      return !_.includes(answered, value.id);;
    });
    var available = _.shuffle(_.map(filteredQuestions, 'id'));

    if (available.length) {
      var count = available.length > num ? num : available.length;
      for(var i = 0; i < count; i++) {
        target.push({
          id: available[i],
          proficiency: 0,
          correct: 0,
          seen: 0,
        });
      }
      if (!isTarget) this.setState(this.state);
      console.log("New Question Added!");
      return isTarget ? target : available[0];
    } else {
      console.log("No more new questions to add");
      return target;
    }

  },

  nextQuestionID: function() {
    // Store the previous ID
    this.state.previousQuestionID = this.state.currentQuestionID;

    // Get the first one in the list that hasn't been seen.
    var nextQuestion = this.state.currentQuestionID ?
      _.findIndex(this.state.data.questions, { id: this.state.currentQuestionID })
      : -1;

    if (this.state.data.questions[nextQuestion+1] && this.state.data.questions[nextQuestion+1].proficiency <= 4) {
      return this.state.data.questions[nextQuestion+1].id;
    } else {
      this.addQuestion(5);
      console.log("All questions seen. Adding 5 more.")
      this.state.data.questions = _.orderBy(_.shuffle(this.state.data.questions), ['proficiency','seen'], ['asc', 'asc']);
      this.setState(this.state);
      return this.state.data.questions[0].id;
    }
  },

  didAddLog: function() {
    jQuery(this.scrollWindow).animate({ scrollTop: jQuery(this.innerWindow).innerHeight() });
  },

  render: function() {
    var target =  _.find(this.props.questions, {id: this.state.currentQuestionID});
    var previous = _.find(this.props.questions, {id: this.state.previousQuestionID}) || {answer:"", url:""};
    return (
      <div>
        <Head>
          <title>Tachyons Pro</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Code+Pro|Material+Icons" />
          <style>{
            '.material-icons {font-size:inherit;} .code, code {font-family: Source Code Pro;}'
          }</style>
        </Head>
        <div className="vh-100 pa4 mw7 center">
          <h1 className="f5 mv4 sans-serif">Are you a Tachyons Pro?</h1>
          <p className="f5 mt4 mb5 sans-serif">Learn Tachyons by memorizing the class names. <a href="http://tachyons.io" target="_blank">What is Tachyons?</a></p>

          <div className="w-100 vh-50 bg-black-80 white-80 overflow-hidden br3 relative">
            <div className="absolute top-0 left-0 w-100 h2 bg-white-50">
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mr1 ml2"></span>
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mh1"></span>
              <span className="w1 h1 br-100 bg-white-50 dib mv2 mh1"></span>
            </div>

            <div 
              className="w-100 h-100 overflow-hidden pv4"
              ref={ (div) => { this.scrollWindow = div; } }
            >
            <div 
              className="w-100 pl4 f5 code"
              ref={ (div) => { this.innerWindow = div; } }
            >
              <StyleQuestionLog
                questionLog={ this.props.myData.log }
                didAdd={ this.didAddLog }
              />
              <StyleQuestionBlock
                tachyonsStyle={ target }
                isEditable={ true }
                onAnswer={ function(isCorrect) {this.onAnswer(isCorrect)}.bind(this) }
              />
              <br /> 
            </div>
            </div>

            <div className="absolute bottom-0 left-0 w-100 h2 bg-black-90"></div>

          </div>

        </div>
      </div>
    );
  }
})

export default () => <Application questions={questions.questions} myData={ { score:0, log:[], questions:[] } } />
