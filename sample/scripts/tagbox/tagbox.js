(function(){
    class TagBox extends HTMLElement{
        static get observedAttributes() {
            return ["value"];
        }

        constructor() {
            super();
            this.setElement = this.setElement.bind(this); 
            
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = tagBoxTemplate;
            
            this.tagBoxList = shadowRoot.querySelector('[tagBoxList]');
            this.tagBoxOverallTip = shadowRoot.querySelector('[tagBoxOverallTip]');
        } 

        get id() {
            return this.getAttribute('id');
        }

        get value() {
            return this.getAttribute('value');
        }

        get list() {
            return this.getAttribute('list');
        }

        get showtip() {
            return this.getAttribute('showtip');
        }

        set value(newval) {
            this.setAttribute('value',newval);
        }

        setElement(){
            if(this.id)
            {
                this.tagBoxList.id = this.id+"-List";
            }

            if(this.showtip === "true"){
                this.tagBoxOverallTip.id = this.id+"-OverallTip"
                this.tagBoxOverallTip.style.display = "inline-block";
            }

            if(this.value){
            }

        }
        connectedCallback() {
            this.setElement();

        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.setElement();
            if(name === 'value'){

                addNewGroup({
                    parentValue:this, 
                    parentId: this.id, 
                    contNode:this.tagBoxList, 
                    overallTipNode: this.tagBoxOverallTip,
                    emailGroup:JSON.parse(newValue)
                });

            }
            
        }

        
    }

    function addNewGroup(input){
        let groupDataObj = input.emailGroup;
        let tagCont = input.contNode;
        let contId = input.parentId;
        let parentObj = input.parentValue;
        let overallTipCont = input.overallTipNode;

        let emailAddressesArray = [];
        Object.keys(groupDataObj).forEach(dataObjKey =>{
            let displayText = dataObjKey;
            let emailAddresses = groupDataObj[dataObjKey];
            let tagEmailAddressesArray = [];
            let tagEmailAddresses = "";
            emailAddresses.forEach(address => {
                emailAddressesArray.push(address);
            });

            if(!input.contNode.querySelector('#'+dataObjKey) ){
                //form and sort the tag email addresses
                emailAddresses.forEach(address => {
                    tagEmailAddressesArray.push(address);
                });
                tagEmailAddressesArray.sort();
                tagEmailAddressesArray.forEach(address => {
                    tagEmailAddresses+= address +"<br />";
                });

                //create a new tag
                let tag = document.createElement("div"); 
                tag.classList.add('tag');
                tag.classList.add('tooltip');
                tag.setAttribute('parent', contId)
                tag.setAttribute('id', displayText)

                //create tag's display content
                let span = document.createElement("span"); 
                span.innerHTML = displayText;
                tag.appendChild(span);

                //create tag's removal icon and logic
                let i = document.createElement("i"); 
                i.classList.add('fas');
                i.classList.add('fa-times-circle');
                i.addEventListener('click', function (event){
                    let idToDelete = event.target.parentElement.id;
                    let parentValueObj = JSON.parse(parentObj.value);
                    delete parentValueObj[idToDelete]
                    parentObj.value = JSON.stringify(parentValueObj);
                    event.target.parentElement.parentNode.removeChild(event.target.parentElement);

                });
                tag.appendChild(i);

                //create tag's tooltip
                let tooltipDom = document.createElement("span"); 
                tooltipDom.classList.add('tooltiptext');
                tooltipDom.innerHTML = tagEmailAddresses;
                tag.appendChild(tooltipDom);

                tagCont.appendChild(tag);
            }
        });

        let emailAddressesString = "";
        emailAddressesArray.sort();
        emailAddressesArray.forEach(address => {
            emailAddressesString += address +"<br />";
        });
        if(emailAddressesString === "") emailAddressesString = " - ";
        overallTipCont.querySelector(".tooltiptext").innerHTML = emailAddressesString;
    }
    

    window.customElements.define('tag-box', TagBox);
})();