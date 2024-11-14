# Visitor-Count
A counter for websites that tracks visitors count. Deployed on Render free instance.

<p align="center">
<a href="https://github.com/WZhengJie99/Visitor-Count"><img alt="Visitor Count" 
      src="https://visitor-count-t7vu.onrender.com/counter-image?siteIdentifier=https://github.com/WZhengJie99/Visitor-Count&style=cards-spades"></a>
</p>

> [!NOTE]
> Render free instance will spin down with inactivity, which can delay requests by 50 seconds or more.

## Table of contents

* [Using the counter](#using-the-counter)
* [Themes](#themes)
* [Local Installation](#local-installation)
* [Contributions](#contributions)
* [Acknowledgements](#acknowledgements)

## Using the counter

Replace ```yoursite``` with your link and replace ```yourstyle``` with the style you want. The default style is numbers.

1. As an iframe:

```
<iframe src="https://visitor-count-t7vu.onrender.com/?siteIdentifier=yoursite&style=yourstyle" id="visitor-count-iframe"><iframe>
```

2. As an img:

```
<img alt="Visitor Count" src="https://visitor-count-t7vu.onrender.com/counter-image?siteIdentifier=yoursite&style=yourstyle">
```

3. Markdown
 
```
![Visitor Count](https://visitor-count-t7vu.onrender.com/counter-image?siteIdentifier=yoursite&style=yourstyle)
```

<details>
<summary>
      
## Themes

</summary>

##### numbers
![Visitor Count Demo](https://visitor-count-t7vu.onrender.com/counter-image?siteIdentifier=demo&style=numbers&test=true)

##### cards-spades
![Visitor Count Demo](https://visitor-count-t7vu.onrender.com/counter-image?siteIdentifier=demo&style=cards-spades&test=true)

</details>

## Local Installation

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/WZhengJie99/Visitor-Count.git
   ```

2. Navigate to the project directory:
   ```
   cd Visitor-Count
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

The counter will be available at `http://localhost:3000` by default.


## Contributions

Contributions are welcomed with pull requests!

1. Fork this repository.
2. Commit changes.
3. Push your changes to your forked repository.
4. Open a pull request to the `main` branch of this repository.

### Styles Contribution

1. Create a new folder inside the ```styles``` folder with a unique name that represents the new style.
2. Name the number images by their numerical digit only, so each file should simply be named ```0```, ```1```, ```2```, up to ```9```, with no additional labels.
3. Update this README.md by adding your style under the [Themes](#themes) section.
4. Add your style name inside the ```const styleFolders``` array in the ```docs/index.html``` file. This allows the style to appear in the dropdown menu on the website.

## Acknowledgements

- Thanks to [Render](https://render.com/) for providing free hosting.
- Inspired by [Moe-Counter](https://github.com/journey-ad/Moe-Counter).

