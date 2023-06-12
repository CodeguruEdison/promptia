import { ILayout } from '@/models/ILayout'
import Nav from '@components/Nav';
import '@styles/globals.css'

export const metadata = {
    title:'Promptia',
    description:'Discover the best prompts from around the web'
}

const RootLayout = (props:ILayout) => {
  const {children}=props;
  return (
   <html lang='en'>
     <body>
        <div className='main'>
          <div className='grandient'>

          </div>
            <main className='app'>
              <Nav></Nav>
              {children}
            </main>
        </div>
     </body>
    </html>
  )
}

export default RootLayout