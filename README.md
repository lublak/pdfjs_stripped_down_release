# pdfjs_stripped_down_release_action

Used for:

https://github.com/lublak/pdfjs-es5-build
https://github.com/lublak/pdfjs-build

## Usage

```yaml
jobs:
  create-pdfjs-es5:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: lublak/pdfjs-stripped-down_release-action@v1
        with:
          use-es5: true
```