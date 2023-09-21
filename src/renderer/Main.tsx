import './Main.css';
import React from 'react';
import $ from 'jquery';

export default class Main extends React.Component {
  componentDidMount(): void {
    $('#page2').hide();
    $('#page3').hide();
    $('#page4').hide();
    $('#app').hide();
    $.post("http://localhost:8080/loaded", {}, () => {});
    if (localStorage.getItem('password') !== null) {
      $('#page1').hide();
      $('#page2').show();
      $('.header').html('Enter your password');
    }
    $('#go2').click(() => {
      $('#page1').hide();
      $('#page2').show();
      if (localStorage.getItem('password') !== null) {
        $('.header').html('Enter your password');
      }
    });
    $('#go3').click(() => {
      if (localStorage.getItem('password') !== null) {
        if (localStorage.getItem('password') === $('#password').val()) {
          $('#page1').hide();
          $('#page2').hide();
          $('#app').show();
        }
      }
      if (
        $('#password').val() !== '' &&
        localStorage.getItem('password') === null
      ) {
        $('#page1').hide();
        $('#page2').hide();
        $('#page3').show();
        localStorage.setItem('password', $('#password').val());
      }
    });
    $('#go4').click(() => {
      // Set keyboard layout
      // eslint-disable-next-line promise/catch-or-return
      $.post('http://localhost:8080/setkbmap', {
        kbmap: $("#kbmap").val(),
      });
      $('#page3').hide();
      $('#page4').show();
    });
    $('#done').click(() => {
      $('#page4').hide();
      $('#app').show();
    });
    $("#password").on("keydown", (e) => {
      if (e.keyCode === 13) {
        $("#go3").click();
      }
    });
  }

  render() {
    return (
      <div>
        <div id="page1">
          <h1 className="header">Welcome to koyuOS</h1>
          <div className="nextbutton" id="go2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="64px"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                style={{ fill: '#fff' }}
              />
            </svg>
          </div>
        </div>
        <div id="page2">
          <h1 className="header">Set a password</h1>
          <input
            className="biginput"
            type="password"
            id="password"
            autoFocus="true"
          />
          <div className="nextbutton" id="go3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="64px"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                style={{ fill: '#fff' }}
              />
            </svg>
          </div>
        </div>
        <div id="page3">
          <h1 className="header">Set keyboard layout</h1>
          <select name="kbmap" id="kbmap">
            <option value="us">American</option>
            <option value="gb">British</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="fr">French</option>
            <option value="tr">Turkish</option>
            <option value="dk">Danish</option>
            <option value="es">Spanish</option>
            <option value="pl">Polish</option>
            <option value="ru">Russian</option>
          </select>
          <p>More keyboard layouts to come :)</p>
          <div className="nextbutton" id="go4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="64px"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                style={{ fill: '#fff' }}
              />
            </svg>
          </div>
        </div>
        <div id="page4">
          <h1 className="header">That's all. Have fun!</h1>
          <div className="nextbutton" id="done">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="64px"
              viewBox="0 0 320 512"
            >
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                style={{ fill: '#fff' }}
              />
            </svg>
          </div>
        </div>
        <div id="app">
          <p>System menu:</p>
          <ul>
            <li>
              <a href="javascript:lock()">Lock</a>
            </li>
            <li>
              <a href="javascript:shutdown()">Shutdown</a>
            </li>
            <li>
              <a href="javascript:reboot()">Reboot</a>
            </li>
          </ul>
          <br></br>
          <p>Todo</p>
        </div>
      </div>
    );
  }
}
