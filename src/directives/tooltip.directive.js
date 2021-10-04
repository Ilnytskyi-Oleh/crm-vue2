

export default {
  bind(el, {value}){
    //закостылено для появления тултипа сверху кнопки добавления новой записи
    window.M.Tooltip.init(el, {html:(value['value'] || value), position: value['position']});
  },
  unbind(el){
    const tooltip =  window.M.Tooltip.getInstance(el);
    if(tooltip && tooltip.destroy){
      tooltip.destroy();
    }
  }
}
