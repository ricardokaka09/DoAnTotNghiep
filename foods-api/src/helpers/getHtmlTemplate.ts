import { ConfigService } from '../configs/configs.service';

interface VerifyData {
  token: string;
}

export const buildVerifyEmail = ({ token }: VerifyData) => {
  const configService = new ConfigService();

  const inviteRef = `${configService.frontEndHost}/companies/register/verify?token=${token}`;
  const subject = 'Active Your Account';
  const text = 'FLASH BUY';
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html
    data-editor-version="2"
    class="sg-campaigns"
    xmlns="http://www.w3.org/1999/xhtml"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {
            width: 700px;
            margin: 0 auto;
          }
          table {
            border-collapse: collapse;
          }
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
        </style>
      <![endif]-->
      <style type="text/css">
        html {
          font-size: 62.5% !important;
        }
        body,
        p,
        div {
          font-family: arial, helvetica, sans-serif;
        }
        body {
          color: #000000;
        }
        body a {
          color: #1188e6;
          text-decoration: none;
        }
        p {
          margin: 0;
          padding: 0;
        }
        table.wrapper {
          width: 100% !important;
          table-layout: fixed;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table.main_table{
          display: flex ;
          justify-content: center !important;
          align-items: center !important;
          flex-direction: column !important;
        }
        img.max-width {
          max-width: 100% !important;
        }
        .column.of-2 {
          width: 50%;
        }
        .column.of-3 {
          width: 33.333%;
        }
        .column.of-4 {
          width: 25%;
        }
        ul ul ul ul {
          list-style-type: disc !important;
        }
        ol ol {
          list-style-type: lower-roman !important;
        }
        ol ol ol {
          list-style-type: lower-latin !important;
        }
        ol ol ol ol {
          list-style-type: decimal !important;
        }
        em {
          line-height: 1 !important;
        }
        @media screen and (max-width: 650px) {
          html {
            font-size: 55%;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 100% !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .social-icon-column {
            display: inline-block !important;
          }
        }
        @media screen and (max-width: 480px) {
          html {
            font-size: 50% !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .preheader .rightColumnContent,
          .footer .rightColumnContent {
            text-align: left !important;
          }
          .preheader .rightColumnContent div,
          .preheader .rightColumnContent span,
          .footer .rightColumnContent div,
          .footer .rightColumnContent span {
            text-align: left !important;
          }
          .preheader .rightColumnContent,
          .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 100% !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .social-icon-column {
            display: inline-block !important;
          }
        }
      </style>
      <!--user entered Head Start-->
      <!--End Head user entered-->
    </head>
    <body>
      <center
        class="wrapper"
        data-link-color="#1188E6"
        data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; "
      >
        <div class="webkit">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            class="wrapper"
            bgcolor="#f5f5f5"
          >
            <tr>
              <td valign="top" bgcolor="#f5f5f5" width="100%">
                <table
                  width="100%"
                  role="content-container"
                  class="outer"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td width="100%">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td>
                            <!--[if mso]>
      <center>
      <table><tr><td width="700">
    <![endif]-->
                            <table
                              class='main-table'
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="
                                width: 100%;
                                max-width: 700px;
                                background-color: #f5f5f5;

                                height: 90vh;
                              "
                              align="center"
                            >
                              <tr>
                                <td
                                  role="modules-container"
                                  style="
                                    padding: 0px 0px 0px 0px;
                                    color: #000000;
                                    text-align: left;
                                    margin-top: 100px;
                                  "
                                  bgcolor="#f5f5f5"
                                  width="100%"
                                  align="left"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    style="padding: 0px 0px 0px 0px"
                                    bgcolor=""
                                    data-distribution="1"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="700"
                                            style="
                                              width: 700px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 0px 0px 0px;
                                              margin-bottom: 50px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="wrapper"
                                                    role="module"
                                                    data-type="image"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="eb8f13b4-163e-4e06-b97a-299f04852feb"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            line-height: 10px;
                                                            padding: 0px 0px 0px
                                                              0px;
                                                          "
                                                          valign="top"
                                                          align="center"
                                                        >
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <div>
                                                              <span
                                                                style="
                                                                  font-family: 'times new roman',
                                                                    times, serif;
                                                                  color: #48af35;
                                                                  font-size: 3.2rem;
                                                                  text-transform: uppercase;
                                                                  font-weight: 900;
                                                                "
                                                                ><em style="line-height= 1">
                                                                Thanks for signing up</em
                                                                ></span
                                                              >
                                                            </div>
                                                            <div
                                                              style="
                                                                font-family: inherit;
                                                                text-align: center;
                                                                margin: 30px 0;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  font-family: 'times new roman',
                                                                    times, serif;
                                                                  color: #8c7f7f;
                                                                  font-size: 1.6rem;
                                                                "
                                                                ><em
                                                                style="line-height= 1"
                                                                  >We're happy you're here. Let's get your email address verified:
                                                                </em></span
                                                              >
                                                            </div>
                                                            <a
                                                              href="${inviteRef}"
                                                              style="
                                                                background: linear-gradient(
                                                                  95.71deg,
                                                                  #17e030 -39.64%,
                                                                  #74c56f 135.31%
                                                                );
                                                                border: 0px solid
                                                                  #333333;
                                                                border-color: #333333;
                                                                border-radius: 0px;
                                                                border-width: 0px;
                                                                color: #fff;
                                                                display: inline-block;
                                                                font-size: 1.4rem;
                                                                font-weight: normal;
                                                                letter-spacing: 2px;
                                                                line-height: normal;
                                                                padding: 10px 20px;
                                                                text-align: center;
                                                                text-decoration: none;
                                                                border-style: solid;
                                                                font-family: times
                                                                    new roman,
                                                                  times, serif;
                                                                text-transform: uppercase;
                                                              "
                                                              target="_blank"
                                                              >Click to Verify Email</a
                                                            >
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    style="padding: 60px 0px 20px 0px"
                                    bgcolor=""
                                    data-distribution="1"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="680"
                                            style="
                                              width: 680px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 10px 0px 10px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="module"
                                                    role="module"
                                                    data-type="social"
                                                    align="center"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="11fddd65-fe7b-47d5-b90c-36833a402f60"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          valign="top"
                                                          style="
                                                            padding: 0px 0px 0px
                                                              0px;
                                                            font-size: 6px;
                                                            line-height: 10px;
                                                          "
                                                          align="center"
                                                        >
                                                          <table
                                                            align="center"
                                                            style="
                                                              -webkit-margin-start: auto;
                                                              -webkit-margin-end: auto;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr align="center">
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.facebook.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Facebook"
                                                                    title="Facebook"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Facebook"
                                                                      title="Facebook"
                                                                      src="https://mc.sendgrid.com/assets/social/white/facebook.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://twitter.com/sendgrid"
                                                                    target="_blank"
                                                                    alt="Twitter"
                                                                    title="Twitter"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Twitter"
                                                                      title="Twitter"
                                                                      src="https://mc.sendgrid.com/assets/social/white/twitter.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.instagram.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Instagram"
                                                                    title="Instagram"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Instagram"
                                                                      title="Instagram"
                                                                      src="https://mc.sendgrid.com/assets/social/white/instagram.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.pinterest.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Pinterest"
                                                                    title="Pinterest"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Pinterest"
                                                                      title="Pinterest"
                                                                      src="https://mc.sendgrid.com/assets/social/white/pinterest.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.linkedin.com/company/sendgrid/"
                                                                    target="_blank"
                                                                    alt="LinkedIn"
                                                                    title="LinkedIn"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="LinkedIn"
                                                                      title="LinkedIn"
                                                                      src="https://mc.sendgrid.com/assets/social/white/linkedin.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <!-- <div
                                                    data-role="module-unsubscribe"
                                                    class="module"
                                                    role="module"
                                                    data-type="unsubscribe"
                                                    style="
                                                      color: #403101;
                                                      font-size: 12px;
                                                      line-height: 20px;
                                                      padding: 20px 16px 20px 16px;
                                                      text-align: Center;
                                                    "
                                                    data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                                  >
                                                    <p
                                                      style="
                                                        font-family: times new
                                                            roman,
                                                          times, serif;
                                                        font-size: 12px;
                                                        line-height: 20px;
                                                      "
                                                    >
                                                      <a
                                                        class="
                                                          Unsubscribe--unsubscribeLink
                                                        "
                                                        href="{{{unsubscribe}}}"
                                                        target="_blank"
                                                        style="color: #c29a1f"
                                                        >Unsubscribe</a
                                                      >
                                                    </p>
                                                  </div> -->
                                                  <!-- <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="module"
                                                    data-role="module-button"
                                                    data-type="button"
                                                    role="module"
                                                    style="table-layout: fixed"
                                                    width="100%"
                                                    data-muid="51e9038b-1d42-4d4b-b954-d2f2ade99683"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="center"
                                                          bgcolor=""
                                                          class="outer-td"
                                                          style="
                                                            padding: 20px 0px 20px
                                                              0px;
                                                          "
                                                        >
                                                          <table
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            class="wrapper-mobile"
                                                            style="
                                                              text-align: center;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="center"
                                                                  bgcolor="#F5F8FD"
                                                                  class="inner-td"
                                                                  style="
                                                                    border-radius: 6px;
                                                                    font-size: 16px;
                                                                    text-align: center;
                                                                    background-color: inherit;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://sendgrid.com/"
                                                                    style="
                                                                      background-color: #f5f8fd;
                                                                      border: 1px
                                                                        solid
                                                                        #f5f8fd;
                                                                      border-color: #f5f8fd;
                                                                      border-radius: 25px;
                                                                      border-width: 1px;
                                                                      color: #a8b9d5;
                                                                      display: inline-block;
                                                                      font-size: 10px;
                                                                      font-weight: normal;
                                                                      letter-spacing: 0px;
                                                                      line-height: normal;
                                                                      padding: 5px
                                                                        18px 5px
                                                                        18px;
                                                                      text-align: center;
                                                                      text-decoration: none;
                                                                      border-style: solid;
                                                                      font-family: helvetica,
                                                                        sans-serif;
                                                                    "
                                                                    target="_blank"
                                                                    >♥ POWERED BY
                                                                    TWILIO
                                                                    SENDGRID</a
                                                                  >
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table> -->
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>

  `;
  return { html, subject, text };
};

interface ResetPasswordData {
  token: string;
  email: string;
}

export const buildResetPasswordHtml = ({ token, email }: ResetPasswordData) => {
  const configService = new ConfigService();
  const inviteRef = `${configService.frontEndHost}/users/reset/password/verify?token=${token}&email=${email}`;
  const subject = 'CREATE NEW PASSWORD';
  const text = 'SNT solution';
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html
    data-editor-version="2"
    class="sg-campaigns"
    xmlns="http://www.w3.org/1999/xhtml"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {
            width: 700px;
            margin: 0 auto;
          }
          table {
            border-collapse: collapse;
          }
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
          }
        </style>
      <![endif]-->
      <style type="text/css">
        html {
          font-size: 62.5% !important;
        }
        body,
        p,
        div {
          font-family: arial, helvetica, sans-serif;
        }
        body {
          color: #000000;
        }
        body a {
          color: #1188e6;
          text-decoration: none;
        }
        p {
          margin: 0;
          padding: 0;
        }
        table.wrapper {
          width: 100% !important;
          table-layout: fixed;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table.main_table{
          display: flex ;
          justify-content: center !important;
          align-items: center !important;
          flex-direction: column !important;
        }
        img.max-width {
          max-width: 100% !important;
        }
        .column.of-2 {
          width: 50%;
        }
        .column.of-3 {
          width: 33.333%;
        }
        .column.of-4 {
          width: 25%;
        }
        ul ul ul ul {
          list-style-type: disc !important;
        }
        ol ol {
          list-style-type: lower-roman !important;
        }
        ol ol ol {
          list-style-type: lower-latin !important;
        }
        ol ol ol ol {
          list-style-type: decimal !important;
        }
        em {
          line-height: 1 !important;
        }
        @media screen and (max-width: 650px) {
          html {
            font-size: 55%;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 100% !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .social-icon-column {
            display: inline-block !important;
          }
        }
        @media screen and (max-width: 480px) {
          html {
            font-size: 50% !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .preheader .rightColumnContent,
          .footer .rightColumnContent {
            text-align: left !important;
          }
          .preheader .rightColumnContent div,
          .preheader .rightColumnContent span,
          .footer .rightColumnContent div,
          .footer .rightColumnContent span {
            text-align: left !important;
          }
          .preheader .rightColumnContent,
          .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
          }
          table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
          }
          img.max-width {
            height: auto !important;
            max-width: 100% !important;
          }
          a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .columns {
            width: 100% !important;
          }
          .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .social-icon-column {
            display: inline-block !important;
          }
        }
      </style>
      <!--user entered Head Start-->
      <!--End Head user entered-->
    </head>
    <body>
      <center
        class="wrapper"
        data-link-color="#1188E6"
        data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; "
      >
        <div class="webkit">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            class="wrapper"
            bgcolor="#f5f5f5"
          >
            <tr>
              <td valign="top" bgcolor="#f5f5f5" width="100%">
                <table
                  width="100%"
                  role="content-container"
                  class="outer"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td width="100%">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td>
                            <!--[if mso]>
      <center>
      <table><tr><td width="700">
    <![endif]-->
                            <table
                              class='main-table'
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="
                                width: 100%;
                                max-width: 700px;
                                background-color: #f5f5f5;

                                height: 90vh;
                              "
                              align="center"
                            >
                              <tr>
                                <td
                                  role="modules-container"
                                  style="
                                    padding: 0px 0px 0px 0px;
                                    color: #000000;
                                    text-align: left;
                                    margin-top: 100px;
                                  "
                                  bgcolor="#f5f5f5"
                                  width="100%"
                                  align="left"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    style="padding: 0px 0px 0px 0px"
                                    bgcolor=""
                                    data-distribution="1"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="700"
                                            style="
                                              width: 700px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 0px 0px 0px;
                                              margin-bottom: 50px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="wrapper"
                                                    role="module"
                                                    data-type="image"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="eb8f13b4-163e-4e06-b97a-299f04852feb"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            line-height: 10px;
                                                            padding: 0px 0px 0px
                                                              0px;
                                                          "
                                                          valign="top"
                                                          align="center"
                                                        >
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <div>
                                                              <span
                                                                style="
                                                                  font-family: 'times new roman',
                                                                    times, serif;
                                                                  color: #48af35;
                                                                  font-size: 3.2rem;
                                                                  text-transform: uppercase;
                                                                  font-weight: 900;
                                                                "
                                                                ><em style="line-height= 1">
                                                                Create new password</em
                                                                ></span
                                                              >
                                                            </div>
                                                            <div
                                                              style="
                                                                font-family: inherit;
                                                                text-align: center;
                                                                margin: 30px 0;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  font-family: 'times new roman',
                                                                    times, serif;
                                                                  color: #8c7f7f;
                                                                  font-size: 1.6rem;
                                                                "
                                                                ><em
                                                                style="line-height= 1"
                                                                  >We're happy you're here. Let's get your email address verified:
                                                                </em></span
                                                              >
                                                            </div>
                                                            <a
                                                              href="${inviteRef}"
                                                              style="
                                                                background: linear-gradient(
                                                                  95.71deg,
                                                                  #17e030 -39.64%,
                                                                  #74c56f 135.31%
                                                                );
                                                                border: 0px solid
                                                                  #333333;
                                                                border-color: #333333;
                                                                border-radius: 0px;
                                                                border-width: 0px;
                                                                color: #fff;
                                                                display: inline-block;
                                                                font-size: 1.4rem;
                                                                font-weight: normal;
                                                                letter-spacing: 2px;
                                                                line-height: normal;
                                                                padding: 10px 20px;
                                                                text-align: center;
                                                                text-decoration: none;
                                                                border-style: solid;
                                                                font-family: times
                                                                    new roman,
                                                                  times, serif;
                                                                text-transform: uppercase;
                                                              "
                                                              target="_blank"
                                                              >Click to Verify Email</a
                                                            >
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="center"
                                    width="100%"
                                    role="module"
                                    data-type="columns"
                                    style="padding: 60px 0px 20px 0px"
                                    bgcolor=""
                                    data-distribution="1"
                                  >
                                    <tbody>
                                      <tr role="module-content">
                                        <td height="100%" valign="top">
                                          <table
                                            width="680"
                                            style="
                                              width: 680px;
                                              border-spacing: 0;
                                              border-collapse: collapse;
                                              margin: 0px 10px 0px 10px;
                                            "
                                            cellpadding="0"
                                            cellspacing="0"
                                            align="left"
                                            border="0"
                                            bgcolor=""
                                            class="column column-0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    padding: 0px;
                                                    margin: 0px;
                                                    border-spacing: 0;
                                                  "
                                                >
                                                  <table
                                                    class="module"
                                                    role="module"
                                                    data-type="social"
                                                    align="center"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="table-layout: fixed"
                                                    data-muid="11fddd65-fe7b-47d5-b90c-36833a402f60"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          valign="top"
                                                          style="
                                                            padding: 0px 0px 0px
                                                              0px;
                                                            font-size: 6px;
                                                            line-height: 10px;
                                                          "
                                                          align="center"
                                                        >
                                                          <table
                                                            align="center"
                                                            style="
                                                              -webkit-margin-start: auto;
                                                              -webkit-margin-end: auto;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr align="center">
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.facebook.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Facebook"
                                                                    title="Facebook"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Facebook"
                                                                      title="Facebook"
                                                                      src="https://mc.sendgrid.com/assets/social/white/facebook.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://twitter.com/sendgrid"
                                                                    target="_blank"
                                                                    alt="Twitter"
                                                                    title="Twitter"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Twitter"
                                                                      title="Twitter"
                                                                      src="https://mc.sendgrid.com/assets/social/white/twitter.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.instagram.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Instagram"
                                                                    title="Instagram"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Instagram"
                                                                      title="Instagram"
                                                                      src="https://mc.sendgrid.com/assets/social/white/instagram.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.pinterest.com/sendgrid/"
                                                                    target="_blank"
                                                                    alt="Pinterest"
                                                                    title="Pinterest"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="Pinterest"
                                                                      title="Pinterest"
                                                                      src="https://mc.sendgrid.com/assets/social/white/pinterest.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    padding: 0px
                                                                      5px;
                                                                  "
                                                                  class="
                                                                    social-icon-column
                                                                  "
                                                                >
                                                                  <a
                                                                    role="social-icon-link"
                                                                    href="https://www.linkedin.com/company/sendgrid/"
                                                                    target="_blank"
                                                                    alt="LinkedIn"
                                                                    title="LinkedIn"
                                                                    style="
                                                                      display: inline-block;
                                                                      background-color: #403101;
                                                                      height: 22px;
                                                                      width: 22px;
                                                                    "
                                                                  >
                                                                    <img
                                                                      role="social-icon"
                                                                      alt="LinkedIn"
                                                                      title="LinkedIn"
                                                                      src="https://mc.sendgrid.com/assets/social/white/linkedin.png"
                                                                      style="
                                                                        height: 22px;
                                                                        width: 22px;
                                                                      "
                                                                      height="22"
                                                                      width="22"
                                                                    />
                                                                  </a>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <!-- <div
                                                    data-role="module-unsubscribe"
                                                    class="module"
                                                    role="module"
                                                    data-type="unsubscribe"
                                                    style="
                                                      color: #403101;
                                                      font-size: 12px;
                                                      line-height: 20px;
                                                      padding: 20px 16px 20px 16px;
                                                      text-align: Center;
                                                    "
                                                    data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                                  >
                                                    <p
                                                      style="
                                                        font-family: times new
                                                            roman,
                                                          times, serif;
                                                        font-size: 12px;
                                                        line-height: 20px;
                                                      "
                                                    >
                                                      <a
                                                        class="
                                                          Unsubscribe--unsubscribeLink
                                                        "
                                                        href="{{{unsubscribe}}}"
                                                        target="_blank"
                                                        style="color: #c29a1f"
                                                        >Unsubscribe</a
                                                      >
                                                    </p>
                                                  </div> -->
                                                  <!-- <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="module"
                                                    data-role="module-button"
                                                    data-type="button"
                                                    role="module"
                                                    style="table-layout: fixed"
                                                    width="100%"
                                                    data-muid="51e9038b-1d42-4d4b-b954-d2f2ade99683"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="center"
                                                          bgcolor=""
                                                          class="outer-td"
                                                          style="
                                                            padding: 20px 0px 20px
                                                              0px;
                                                          "
                                                        >
                                                          <table
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            class="wrapper-mobile"
                                                            style="
                                                              text-align: center;
                                                            "
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="center"
                                                                  bgcolor="#F5F8FD"
                                                                  class="inner-td"
                                                                  style="
                                                                    border-radius: 6px;
                                                                    font-size: 16px;
                                                                    text-align: center;
                                                                    background-color: inherit;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://sendgrid.com/"
                                                                    style="
                                                                      background-color: #f5f8fd;
                                                                      border: 1px
                                                                        solid
                                                                        #f5f8fd;
                                                                      border-color: #f5f8fd;
                                                                      border-radius: 25px;
                                                                      border-width: 1px;
                                                                      color: #a8b9d5;
                                                                      display: inline-block;
                                                                      font-size: 10px;
                                                                      font-weight: normal;
                                                                      letter-spacing: 0px;
                                                                      line-height: normal;
                                                                      padding: 5px
                                                                        18px 5px
                                                                        18px;
                                                                      text-align: center;
                                                                      text-decoration: none;
                                                                      border-style: solid;
                                                                      font-family: helvetica,
                                                                        sans-serif;
                                                                    "
                                                                    target="_blank"
                                                                    >♥ POWERED BY
                                                                    TWILIO
                                                                    SENDGRID</a
                                                                  >
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table> -->
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>

  `;
  return { html, subject, text };
};
