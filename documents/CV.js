window.onload = function() {
    let dropdowns = document.getElementsByClassName('dropdown');

    let activatedDropdownSymbol = "↓";
    let unactivatedDropdownSymbol = "→";

    for(let i = 0; i < dropdowns.length; i++) {
        let dropdown = dropdowns[i];
        let [dropdownLi, dropdownUl] = dropdown.children;

        dropdownLi.style.cursor = 'pointer';
        dropdownLi.innerHTML = '🠢 ' + dropdownLi.innerHTML.slice(2);
        dropdownUl.style.display = "none"

        dropdownLi.onmouseenter = function () {
            dropdownLi.style.color = 'grey';
        }

        dropdownLi.onmouseleave = function () {
            dropdownLi.style.color = '';
        }

        dropdownLi.onclick = function () {
            if (dropdownUl.style.display === "none") {
                dropdownUl.style.display = "block";
                dropdownLi.innerHTML = `${activatedDropdownSymbol} ${dropdownLi.innerHTML.slice(2)}`;
            } else {
                dropdownUl.style.display = "none";
                dropdownLi.innerHTML = `${unactivatedDropdownSymbol} ${dropdownLi.innerHTML.slice(2)}`;
            }
        }


    }

}
