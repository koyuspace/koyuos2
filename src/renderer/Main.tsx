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
          loadApps();
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
      loadApps();
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
          <ul id="menu">
            <li>
              <a href="javascript:lock()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" style={{ fill: '#fff' }} /></svg>
              </a>
            </li>
            <li>
              <a href="javascript:shutdown()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" style={{ fill: '#fff' }} /></svg>
              </a>
            </li>
            <li>
              <a href="javascript:reboot()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" style={{ fill: '#fff' }} /></svg>
              </a>
            </li>
            <li>
              <a href="javascript:editmode()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" style={{ fill: '#fff' }} /></svg>
              </a>
            </li>
          </ul>
          <div className="clear"></div>
          <div id="apps"></div>
        </div>
        <div id="appstore"></div>
      </div>
    );
  }
}
