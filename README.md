<p>
  Type Extension Bootstrap Tool for Infor Nexus Developers
  <a href="https://developer.infornexus.com/">Infor Nexus Developer Network</a>
  <br/>
  Type Extension Bootstrap uses <ahref="https://github.com/electron-react-boilerplate/electron-react-boilerplate">Electron React Boilerplate</a>
</p>

<br>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/i4ybrid/type-extension-bootstrap.git type-extension-bootstrap
cd type-extension-bootstrap
yarn
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## TODO

- Build to .exe and .pkg
- Add confirmation pop up when Submit succeeds or failure
- Repository in Tools
- Remove search bar
- Remove extra icons on the left navbar
- Allow for multiple seed documents
- Move README.md
- Add the ability to query REST directly and load it into the test data
- Move to web application? (remove Electron)

## Open Bugs

- Need to refresh Seed and Target data in the Unit Test page
- When manually deleting fields, we are getting an error pop up Cannot read property 'documentType' of undefined
- Roles sometimes doesn't seem to update when updating Event
- Seed data is ALWAYS generated, even when it's empty
- Error when settings folder is not created?

## Maintainers

- [Eric Hu](https://github.com/i4ybrid)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
[david-image]: https://img.shields.io/david/electron-react-boilerplate/electron-react-boilerplate.svg
[david-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate
[david-dev-image]: https://img.shields.io/david/dev/electron-react-boilerplate/electron-react-boilerplate.svg?label=devDependencies
[david-dev-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate?type=dev
[good-first-issue-image]: https://img.shields.io/github/issues/electron-react-boilerplate/electron-react-boilerplate/good%20first%20issue.svg?label=good%20first%20issues
[good-first-issue-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"

# type-extension-bootstrap
