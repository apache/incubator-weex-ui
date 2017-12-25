## How to contribute to Weex Ui
 
Welcome to create [pull requests](https://github.com/alibaba/weex-ui/compare/) for bugfix, new component, doc, example, suggestion and anything.

## Branch Management

```
master
 ↑
dev         <--- Develop/PR
```

* `dev` branch
  * `dev` is the developing branch.   
  * It's **RECOMMENDED** to commit feature PR to `dev `.   
* `master` branch
  * `master` is the release branch,we will make tag and publish version on this branch.


## Commit Log

```
[{action}] {description}
```

* `{action}`
    * `+` add
    * `!` update or bugfix
    * `-` remove
* `{description}`
    * Just make it as clear and simple as possible.

for example:
- [+] Support for IPhoneX.
- [!] The code format follows ESlint.

## More
It is a good habit to create a feature request issue to disscuss whether the feature is necessary before you implement it. However, it's unnecessary to create an issue to claim that you found a typo or improved the readability of documentaion, just create a pull request.
