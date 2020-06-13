import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./cbi.css";
export default class chatbot extends Component {
  
  render() {
    const theme = {
      background: "#f5f8fb",
      fontFamily: "Helvetica Neue",
      headerBgColor: "#EF6C00",
      headerFontColor: "#fff",
      headerFontSize: "15px",
      botBubbleColor: "#EF6C00",
      botFontColor: "#fff",
      userBubbleColor: "#fff",
      userFontColor: "#4a4a4a",
    };

    const steps = [
      {
        id: '1',
        message: "Merhaba nasıl yardımcı olabilirim? ",
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Sepete ürün ekleme', trigger: 'Sepete ürün ekleme' },
          { value: 2, label: 'Giriş yapma', trigger: 'Giris yapma' },
          { value: 3, label: 'Satın alım', trigger: 'Satın alım' },
          { value: 4, label: 'Sipariş süresi', trigger: 'Siparis suresi' },
        ],
      },
      {
        id: 'Sepete ürün ekleme',
        message: 'İstediğiniz urunun altında s, m ve l harfleri bulunmaktadır. S harfi small , m harfi medium ve l harfi large bedenlerini temsil etmektedir. Eger ıstediginiz bedene tıklarsanız urun sepete eklenir',
        trigger: "baskabirsey",
      },
      {
        id: 'Giris yapma',
        message: "Navigation bar kısmında GPP'ye basıp login'e bastığınızda kendi hesabınızla giriş yapabilirisiniz. Eğer hesabınız yoksa register'a basıp kaydolabilirisiniz",
        trigger: "baskabirsey",
      },
      {
        id: 'Satın alım',
        message: 'Ürünü satın almak için yapmanız gereken ; sitenin üst tarafında yer alan sepet butonuna tıkladıktan sonra satın al butonuna tıklamanız gerekmektedir.',
        trigger: "sa2",
      },
      {
        id: 'sa2',
        message: 'İlk olarak sepete ürün eklemeyi unutmayın :D',
        trigger: "baskabirsey",
      },
      {
        id: 'Siparis suresi',
        message: 'Sipariş suresi her il için aynı olmakla birlikte bu süre 5 iş günü içerisinde teslim edilmektedir',
        trigger: "baskabirsey",
      },
      {
        id: 'baskabirsey',
        message:'Başka yardım isteyeceğiniz konu var mı?',
        trigger:"sonsoru"
      },
      {
        id:"sonsoru",
        options: [
          { value: 1, label: 'Evet', trigger: '2' },
          { value: 2, label: 'Hayır', trigger: 'son' }
        ],
      },
      {
        id:"son",
        message:"İyi günler",
        end: true
      }
    ]
    

    return (
      <div className="chatbox">
        <ThemeProvider theme={theme}>
        <ChatBot
        headerTitle="Destek"
        //speechSynthesis={{ enable: true, lang: 'tr' }}
        steps={steps}
      />
        </ThemeProvider>
      </div>
    );
  }
}
