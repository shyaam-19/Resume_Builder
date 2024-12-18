import React,{useEffect} from 'react';
import '../styledComponent/footer.css'

function Footer() {

  let width = window.innerWidth;
    useEffect(() => {
        
        function handleResize() {
            width = window.innerWidth;
        }
    
        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);
    
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


  return (
    <>

      <div className="footer w-screen">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footer-links-div">
              <a href="">
                <p>Build Resume</p>
              </a>

              <a href="">
                <p>Sample Resume</p>
              </a>

              <a href="">
                <p>Resume Parser</p>
              </a>
            </div>

            <div className="sb__footer-links-div">
              <a href="">
                <p>Help Center</p>
              </a>

              <a href="">
                <p>About Us</p>
              </a>

              <a href="">
                <p>Our Policy</p>
              </a>
            </div>

            <div className="sb__footer-links-div">
              <a href="">
                <p>Build Resume</p>
              </a>

              <a href="">
                <p>Sample Resume</p>
              </a>

              <a href="">
                <p>Resume Parser</p>
              </a>
            </div>

            <div className="sb__footer-links-div">
              <a href="">
                <p>Help Center</p>
              </a>

              <a href="">
                <p>About Us</p>
              </a>

              <a href="">
                <p>Our Policy</p>
              </a>
            </div>

          </div>

          <hr></hr>

          <div className="sb__footer-below">
            <div className="sb__footer-copyrigt">
              <p>
                @{new Date().getFullYear()} CodeInn. All Right reserved
              </p>
            </div>
            <div className="sb__footer-below-links">
              <a href="">
                  <p>Terms & conditions</p>
              </a>
              <a href="">
                  <p>Privecy policy</p>
              </a>
              <a href="">
                  <p>Security policy</p>
              </a>
              <a href="">
                  <p>Cookie declaration</p>
              </a>


            </div>
          </div>
        </div>

      </div>
      
    </>
  )
}

export default Footer
