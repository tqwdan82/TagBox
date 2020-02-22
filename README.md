# TagBox
Custom HTML5 Tag Box for email address group and addresses

A JavaScript and HTML5 library that provides adding low level object maps to a tag display, mainly for email address and email group purpose. This library is meant to provide an example on creating custom elements, assigning attributes to the element and behaviours to the element.

## Getting Started

Download ```tagBox``` directory and include the directory and to your script directory/location
Requires Fontawesome library

### Steps to Setting Up
1. Include the required JavaScript library in your page.
```
<script src="scripts/tagbox/tagbox.tpl.js"></script>
<script src="scripts/tagbox/tagbox.js"></script>
```

2. Add the element to your page where is necessary.
```
<tag-box id="tagbox1" showtip="true"></tag-box>
```
- id: Element Id
- value: group to email address objects
e.g.
```
{
  "email group 1":["address1@domain1.com","address2@domain2.com"],
  "email group 2":["address3@domain3.com","address4@domain4.com"]
}
```
- showtip: true/false to indicate display of tooltip for an overall list of email addresses

2. Get the email group and addresses by getting the value of the DOM
e.g.
```
console.log(document.getElementById('tagbox1').value)
```

## Sample
Look in the sample directory for a sample

## Built With

* [Visual Code] - IDE

## Authors

* **TQW** - *Initial work* - [tqwdan82](https://github.com/tqwdan82)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project, if any.

## License

This project is free to use.
