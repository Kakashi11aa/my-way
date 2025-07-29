
    const input = document.getElementById("myTextarea");
    const wordList = document.getElementById("wordList");
    const words = [];

    const saved = localStorage.getItem("savedWords");
if (saved) {
const parsed = JSON.parse(saved);
if (Array.isArray(parsed)) {
 words.push(...parsed);
 updateList();
}
}


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // отключаем перенос строки

    const text = input.value.trim().toLowerCase();
    const parts = text.split(" "); // делим по пробелу

    if (parts.length >= 2) {
      const eng = parts[0];
      const rus = parts.slice(1).join(" "); // остальная часть — перевод
      const formatted = `${eng} - ${rus}`;
      const isDuplicate = words.some(w => w.toLowerCase() === formatted);

      if(!isDuplicate) {
        words.push(formatted);
        updateList();
      }else {
        alert("Такая пара уже добавленя!")
      }

      input.value = "";
    }
  }
});


   function updateList() {
     let html = "<ol>";
     words.forEach((w, index) => {
       html += `
         <li>
           ${w}
           <button onclick="deleteWord(${index})"
                   style="float: right; background: none; border: none; color: #ff2f2f; cursor: pointer; font-size: 16px;">
             удалить
           </button>
         </li>
       `;
     });
     html += "</ol>";
     wordList.innerHTML = html;

     localStorage.setItem("savedWords", JSON.stringify(words));
   }

   function deleteWord(index) {
     words.splice(index, 1);
     updateList();
   }
