# redux-sessionstorage issue repro


## Context, this test app
I use redux-sessionstorage to store a subset of my app's state to session storage. Part of that state indicates whether certain panels in the UI are expanded or collapsed (visible or hidden). This test app reproduces that functionality with a simple Notice panel hidden (or shown) at the click of a button.

## Reproduction steps

1. `git clone git@github.com:shawninder/sessionstorage-bug`
2. `cd sessionstorage-bug`
3. `npm install`
4. `npm run dev`
5. Visit `http://localhost:3000` with your favorite browser
6. By clicking the `toggle` button, set `showNotice` to `true`.
7. Reload the page
8. Expect the server to send down HTML with `showNotice` set to `false` (CHECK)
9. Expect sessionstorage to update the state and set `showNotice` to `true` (CHECK)
10. Expect `render` to be called with the new state (CHECK)
11. Expect the new text content to say `showNotice: true` (CHECK), proving render was called with the new (saved in sessionstorage) value
12. Expect the notice to transition into a visible state (`opacity: 1, translateX(0)`) (OOPS)
13. Observe that instead, the notice remains invisible.

## Analysis

It seems that in the particular case of a render triggered by hydration from session storage, react knows to re-render the nodes, but not their attributes (in this case `style`, but `className` has the same problem). Indeed, the problem disappears if I hide the notice using `{ props.showingNotice ? <div... /> : null}`. Unfortunately, this method doesn't really support transitioning from visible to hidden, which is why I prefer using opacity and transform.

## Question

How can I make sure that updates made by the redux-sessionstorage package correctly update the attributes as well as the nodes themselves?
