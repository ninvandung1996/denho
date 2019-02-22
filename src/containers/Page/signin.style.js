import styled from "styled-components";
import { palette } from "styled-theme";
import bgImage from "../../image/city-1.jpg";
import WithDirection from "../../settings/withDirection";

const SignInStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
    right: ${props => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
  }

  .isoLoginContentWrapper {
    width: 30rem;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoLoginContent {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rem 5rem;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 7rem 2rem;
    }

    .isoLogoWrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 3.5rem;
      flex-shrink: 0;

      a {
        width: 50%;
        height: 50%;
      }

      .vinCity-logo {
        width: 100%;
      }
    }

    .isoSignInForm {
      padding: 1rem;
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 1.5rem;

        &:last-of-type {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &:-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &::-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette("grayscale", 0)};
          }
        }
      }

      button {
        font-weight: 500;
      }
    }
  }
`;

export default WithDirection(SignInStyleWrapper);
