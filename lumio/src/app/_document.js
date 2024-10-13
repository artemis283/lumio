import { Html, Head, Main, NextScript } from 'next/document';

   export default function Document() {
     return (
       <Html>
         <Head>
           <script
             src="https://cdnjs.cloudflare.com/ajax/libs/stellar-freighter-api/1.1.2/index.min.js"
             async
           ></script>
         </Head>
         <body>
           <Main />
           <NextScript />
         </body>
       </Html>
     );
   }