# angular-nav-user-profile-widget

[![Build Status][travis-image]][travis-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

[travis-url]: https://travis-ci.org/fielded/angular-nav-user-profile-widget
[travis-image]: https://img.shields.io/travis/fielded/angular-nav-user-profile-widget.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

> User profile widget components for NAV applications

## Installation

Install with `bower`:

```shell
bower install --save fielded/angular-nav-user-profile-widget
```

or `npm`:

```shell
npm install --save fielded/angular-nav-user-profile-widget
```

Depends on the following **runtime** modules:

```
ngMessages
fallback.src
angular.aws.s3
```

Depends on the following **runtime** services:

```
config
loginService
toastService
```

Make sure your app registers them somewhere.

Then simply add `angularNavUserProfileWidget` as a dependency somewhere in your project that makes sense and you're good to go.

## Contributing

### Installation

```bash
# Clone the GitHub repository
git clone git@github.com:fielded/angular-nav-user-profile-widget.git
# Change into project folder
cd angular-nav-user-profile-widget
# Install the dev dependencies
npm install
```

### Test Suite

The test suite is configured to run with PhantomJS and is powered by:

- Karma
- Jasmine

#### Running Tests

```bash
npm test
```

## Release Process

This project uses [semantic-release][] following the AngularJS commit message
format.

[semantic-release]: https://github.com/semantic-release/semantic-release

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.
