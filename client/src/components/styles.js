import styled from 'styled-components';

export const Container = styled.div`
 background-color: #fff;
 border-radius: 10px;
 box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
 position: relative;
 overflow: hidden;
 width: 1000px;
 height: 700px;
 max-width: 100%;
 min-height: 400px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` 
  : null}
`;

export const SignInContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 z-index: 2;
 ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
 background-color: #ffffff;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 padding: 0 50px;
 height: 100%;
 text-align: center;
`;

export const Title = styled.h1`
 font-weight: bold;
 margin: 0;
`;

export const Input = styled.input`
 background-color: #eee;
 border: none;
 padding: 12px 15px;
 margin: 8px 0;
 width: 100%;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;

export const GhostButton = styled(Button)`
 background-color: transparent;
 border-color: #ffffff;
`;

export const Anchor = styled.a`
 color: #333;
 font-size: 14px;
 text-decoration: none;
 margin: 15px 0;
`;

export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
  props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
background: #ff416c;
background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
background: linear-gradient(to right, #ff4b2b, #ff416c);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => props.signinIn !== true ? `transform: translateX(50%);` : null}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Navbar styling

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ff416c;
  color: #fff;
`;

export const NavbarLeft = styled.div`
  .navbar-brand {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
  }
`;

export const NavbarRight = styled.div`
  .navbar-nav {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    margin-right: 10px;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    padding: 10px;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .nav-search {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

// Artwork Style

export const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Four columns of equal size */
  grid-gap: 20px; /* Spacing between artworks */
`;

export const ArtworkContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ArtworkTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const ArtworkDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const ArtworkImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

export const ArtworkDetails = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

export const ArtworkDetail = styled.p`
  margin-bottom: 5px;
`;

export const ArtworkAvailability = styled.p`
  font-weight: bold;
  color: ${props => (props.available ? 'green' : 'red')};
`;

export const ArtworkLoading = styled.p`
  font-style: italic;
  color: #888;
`;

export const PageContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Header = styled.header`
  text-align: center;
  padding: 20px;
  background-color: #ff416c;
  color: #fff;
`;

export const ExhibitionHighlights = styled.div`
  padding: 20px;
`;

export const ExhibitionList = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ExhibitionCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  margin: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ExhibitionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const ExhibitionDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #ff416c;
  color: #fff;
  margin-top: 20px;
`;

// Artist styling
export const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns of equal size */
  grid-gap: 20px; /* Spacing between artists */
`;

export const ArtistContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ArtistName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const ArtistBio = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const ArtistImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

export const ArtistLoading = styled.p`
  font-style: italic;
  color: #888;
`;

export const ErrorMessage = styled.p`
  color: red;
`;