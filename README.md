# wahoo
This is a login and registration flow in React and ASP.NET Core.
- Authentication and authorization is managed by ASP.NET Core Identity framework in Dot Net 8. 
- MSSQL Server is used for database management.

#### **Features:**
- Responsive web design
- Notification for unsuccessful registration and login attempts, and successful registration.

## Screenshots
More previews can be viewed in the [screenshots directory](/screenshots/)
### Desktop preview
![Web Login Preview](/screenshots/2-web-login.png)
### Mobile preview
![Mobile Login Preview](/screenshots/2-mobile-login-error.png)

## *Storytime...*
Initially, I wanted the user to complete a login flow and find a surprise waiting them using Vanilla JS and ASP.NET Core, but, I thought that this was also a great opportunity to learn and try something new in the process. This opened the gates to ideas that inspired new ideas.

It was expected that this would add extra complexity to the initial project plan, however, I sorely underestimated the challenge and was forced to question the wisdom of my whims and fancies having dealt with unprecedented bugs and magical ones that somehow disappears for good.

I persevered and overcame the challenges I faced. Some credit goes to the [podcast](https://freakonomics.com/series/nsq/) episodes that kept me company, among them _**grit**_ was a subject that made frequent appearances. I was motivated by the idea that I was living through an experience involving grit. Now here I am to tell the tale of one small moment.

## What I learned
##### _Cross-Origin Resource Sharing (CORS) issues_
- CORS is a security feature implemented by browsers to prevent malicious websites from accessing resources on other domains. 
- To resolve CORS issues in a Vite project with a separate backend, you need to configure the backend server to allow requests from the Vite development server's origin.

##### _Tailwind CSS Framework_
- PostCSS configuration is required when using Vite in your project. Without this, the styling will not take effect.

##### _ASP.NET Core Identity_
- Authentication in ASP.NET Core Identity uses cookie authentication.

##### _React Router_
- `createRoutesFromElements` is a helper that allows Route Objects to be created from `Route` elements.
- `<Link>` behaves the same as an `<a>` but is more efficient because it uses state preservation (JavaScript History API) to navigate within the application without causing a full page reload; providing a smooth and fast user experience.

##### _Jest_
- Mock functions can be used to test user interaction by replacing implementation we don’t control with something we do.
- Jest detected an unexpected `export` token when _confetti_ was a `.js` file, despite the function working as intended. Changing the filetype to `.tsx` solved this issue. The problem was likely related to code transpilation.

##### _Other_
- Familiarity in React and TypeScript
- Using Tailwind CSS and Flowbite components for UI design
- Designing and creating SVG logo
- Using Jest for testing

## Interesting Find
The initial plan was to display a fullscreen video once the user successfully signs in and is redirected to the dashboard page. 
I found that this behaviour could be achieved by calling `displayInFullscreen` which handles fullscreen request in `useEffect`, even though a user gesture (e.g. click) is required to make a video fullscreen given the security measures in place. 

```tsx
  useEffect(() => {
    
      // Handles fullscreen request
      displayInFullscreen();
      return () => {
            document.exitFullscreen();
        };

  }, []);
```

One issue with this solution was that it does not communicate with YouTube API. Though the user may exit fullscreen mode by using `esc` on their keyboard, there is no exit fullscreen icon available on the YouTube video controls. The controls would only display enter fullscreen because only the client browser knows fullscreen mode is active.

I considered a scenario where a user misses the disappering exit instruction using `esc` to be enough of a user-experience concern. And while I was after a surprise factor with a fullscreen video on autoplay, I decided that this could be achieved through other means and pivoted to the use of visual effects.

## Requirements
- [Node](https://nodejs.org/en/download/package-manager) is installed
- In the server project directory, use `dotnet restore` on CLI

## Getting Started
To run the project, I recommend using Visual Studio and start the project from `wahoo.Server.csproj` since this can help ensure the backend is also running with the frontend.

Make sure that your Configure Startup Projects settings:
- Has Multiple startup pages option selected
- Both pages (client and server) are set to Start 


## Testing
To run tests, ensure that that you are in the client directory of the project and use `npm run test` on CLI

## Acknowledgements
- [Visual effects](https://github.com/catdad/canvas-confetti)