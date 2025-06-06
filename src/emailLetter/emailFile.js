module.exports = function (login, pass, payUrl = null, adminUrl) {
    return `
<html lang="en">
<head><title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
        </o:OfficeDocumentSettings>
    </xml><![endif]--><!--[if !mso]><!-->
    <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700;900&amp;display=swap"
            rel="stylesheet" type="text/css"><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide, .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        .image_block img + div {
            display: none
        }

        @media (max-width: 660px) {
            .mobile_hide {
                display: none
            }

            .row-content {
                width: 100% !important
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide, .desktop_hide table {
                display: table !important;
                max-height: none !important
            }

            .reverse {
                display: table;
                width: 100%
            }

            .reverse .column.first {
                display: table-footer-group !important
            }

            .reverse .column.last {
                display: table-header-group !important
            }

            .row-1 td.column.first .border {
                padding: 0;
                border-top: 0;
                border-right: 0;
                border-bottom: 0;
                border-left: 0
            }

            .row-1 td.column.last .border, .row-4 td.column.first .border, .row-4 td.column.last .border {
                padding: 5px 30px;
                border-top: 0;
                border-right: 0;
                border-bottom: 0;
                border-left: 0
            }
        }
    </style>
</head>
<body style="background-color:#eafcff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#eafcff"
       width="100%">
    <tbody>
    <tr>
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
                   style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                                role="presentation"
                                style="mso-table-lspace:0;mso-table-rspace:0;background-color:#20a6b1;color:#000;width:640px;margin:0 auto"
                                width="640">
                            <tbody>
                            <tr class="reverse">
                                <td class="column column-1 first" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="50%">
                                    <div class="border">
                                        <table
                                                border="0" cellpadding="0" cellspacing="0" class="image_block block-1"
                                                role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"
                                                width="100%">
                                            <tr>
                                                <td class="pad" style="width:100%;padding-right:0;padding-left:0">
                                                    <div align="center" class="alignment" style="line-height:10px">
                                                        <div style="max-width:256px"></img src="https://i.ibb.co/SXYgCy8D/Untitled-4.jpg"
                                                                style="display:block;height:auto;border:0;width:100%"
                                                                width="256"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td class="column column-2 last" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="50%">
                                    <div class="border">
                                        <div class="spacer_block block-1"
                                             style="height:20px;line-height:20px;font-size:1px">&#8202;
                                        </div>
                                        <table border="0" cellpadding="10" cellspacing="0" class="text_block block-2"
                                               role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                               width="100%">
                                            <tr>
                                                <td class="pad">
                                                    <div style="font-family:sans-serif">
                                                        <div class
                                                             style="font-size:12px;font-family:Source Sans Pro,Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:14.399999999999999px;color:#555;line-height:1.2">
                                                            <p style="margin:0;font-size:12px;mso-line-height-alt:14.399999999999999px">
                                                                <span style="color:#eafcff;"><strong><span
                                                                        style="font-size:20px;">Telegram bot for business</span></strong></span></strong>
                                                            </p></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3"
                                               role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                               width="100%">
                                            <tr>
                                                <td class="pad">
                                                    <div style="font-family:sans-serif">
                                                        <div class
                                                             style="font-size:14px;font-family:Source Sans Pro,Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2">
                                                            <p style="margin:0;font-size:46px;mso-line-height-alt:55.199999999999996px">
                                                                <span style="color:#ffffff;"><strong>Ваш акаунт готов!</strong></span></strong>
                                                            </p></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation"
                   style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:640px;margin:0 auto"
                               width="640">
                            <tbody>
                            <tr>
                                <td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="100%">
                                    <div class="spacer_block block-1"
                                         style="height:20px;line-height:20px;font-size:1px">&#8202;
                                    </div>
                                    <table
                                            border="0" cellpadding="10" cellspacing="0" class="text_block block-2"
                                            role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                            width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div style="font-family:sans-serif">
                                                    <div class
                                                         style="font-size:14px;font-family:Source Sans Pro,Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:21px;color:#000;line-height:1.5">
                                                        <p style="margin:0;font-size:17px;mso-line-height-alt:25.5px">
                                                            <span style="font-size:17px;">Привет!&nbsp;</span></p>
                                                        <p
                                                                style="margin:0;font-size:17px;mso-line-height-alt:21px">
                                                            &nbsp;</p>
                                                        <p style="margin:0;font-size:17px;mso-line-height-alt:25.5px">
                                                            <span style="font-size:17px;">Мы создали для вас аккаунт в админ панели для управления наполнением вашего бота, все готово для создания вашего первого бота!</span>
                                                        </p>
                                                        <p style="margin:0;font-size:17px;mso-line-height-alt:21px">
                                                            &nbsp;</p>
                                                        <p style="margin:0;font-size:17px;mso-line-height-alt:25.5px">
                                                            <span style="font-size:17px;">Логин:&nbsp;${login}</span></p>
                                                        <p style="margin:0;font-size:17px;mso-line-height-alt:25.5px">
                                                            Пароль:&nbsp;${pass}</p></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="button_block block-3"
                                           role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"
                                           width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div align="center" class="alignment">
                                                    <a href=${adminUrl} style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#20a6b1;border-radius:10px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Source Sans Pro', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                       target="_blank"><span
                                                            style="padding-left:40px;padding-right:35px;font-size:14px;display:inline-block;letter-spacing:normal;"><span
                                                            style="word-break:break-word;"><span data-mce-style style>
<strong><span data-mce-style style="line-height: 28px;">ПЕРЕЙТИ В АДМИНКУ</span></strong></span></span></span></a>
                                                    <!--[if mso]></center></v:textbox></v:roundrect>
                                                    <![endif]--></strong></div>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="button_block block-4"
                                           role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"
                                           width="100%">
                                        <tr>
                                            <td class="pad">
                                                <div align="center" class="alignment">
                                                    <a href=${payUrl} style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#3AAEE0;border-radius:10px;width:auto;border-top:0px solid transparent;font-weight:700;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Source Sans Pro', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"
                                                       target="_blank"><span
                                                            style="padding-left:45px;padding-right:45px;font-size:14px;display:inline-block;letter-spacing:normal;"><span
                                                            style="word-break: break-word; line-height: 28px;">ОПЛАТИТЬ УСЛУГИ</span></span></a>
                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation"
                   style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:640px;margin:0 auto"
                               width="640">
                            <tbody>
                            <tr>
                                <td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1"
                                           role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"
                                           width="100%">
                                        <tr>
                                            <td class="pad" style="padding-bottom:10px;padding-top:10px">
                                                <div align="center" class="alignment">
                                                    <table
                                                            border="0" cellpadding="0" cellspacing="0"
                                                            role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"
                                                            width="100%">
                                                        <tr>
                                                            <td class="divider_inner"
                                                                style="font-size:1px;line-height:1px;border-top:1px solid #bbb">
                                                                <span>&#8202;</span></span></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation"
                   style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace:0;mso-table-rspace:0;background-color:#efefef;color:#000;width:640px;margin:0 auto"
                               width="640">
                            <tbody>
                            <tr class="reverse">
                                <td class="column column-1 first" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="50%">
                                    <div class="border">
                                        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-1"
                                               role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                               width="100%">
                                            <tr>
                                                <td class="pad" style="padding-bottom:10px;padding-top:10px">
                                                    <div
                                                            style="font-family:Tahoma,Verdana,sans-serif">
                                                        <div class
                                                             style="font-size:14px;font-family:Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:16.8px;color:#852976;line-height:1.2">
                                                            <p style="margin:0;font-size:14px;mso-line-height-alt:16.8px">
                                                                <span style="font-size:12px;color:#000000;">Вы получили это письмо, так как ранее заполнили заявку на нашем сайте</span>
                                                            </p></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="spacer_block block-2"
                                             style="height:30px;line-height:30px;font-size:1px">&#8202;
                                        </div>
                                    </div>
                                </td>
                                <td class="column column-2 last" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                    width="50%">
                                    <div class="border">
                                        <table border="0" cellpadding="10" cellspacing="0" class="text_block block-1"
                                               role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                               width="100%">
                                            <tr>
                                                <td
                                                        class="pad">
                                                    <div style="font-family:Tahoma,Verdana,sans-serif">
                                                        <div class
                                                             style="font-size:14px;font-family:Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:16.8px;color:#852976;line-height:1.2">
                                                            <p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                <u><span style="font-size:12px;">8 800 000 00 00</span></u></u>
                                                            </p></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="spacer_block block-2"
                                             style="height:10px;line-height:10px;font-size:1px">&#8202;
                                        </div>
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
</table><!-- End --></body>
</html>
`
}
