/**
 * Script Include: x_app_SubcategoryAjax
 * Type: Client Callable (لازم تفعّل الخيار)
 *
 * الدور ديالو: يستقبل sysparm_category من الـ Client Script
 * ويرجع لائحة Subcategories بصيغة JSON باش نعرضوها فـ choice/list.
 */
var x_app_SubcategoryAjax = Class.create();
x_app_SubcategoryAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  /**
   * sysparm_name = getSubcategories
   * inputs:
   *   - sysparm_category : sys_id ديال الـ category
   * output:
   *   JSON string بحال: [{value:"sys_id1", label:"Sub 1"}, ...]
   */
  getSubcategories: function () {

    // 1) كنجيب الباراميتر اللي جا من الـ Client
    var categorySysId = this.getParameter("sysparm_category");

    // 2) إذا ما كاينش category نرجعو JSON فارغ
    if (!categorySysId)
      return "[]";

    // 3) مثال: كنقلبو فـ جدول subcategory (بدّل اسم الجدول والحقول حسب عندك)
    // نفترض جدول: u_subcategory فيه:
    //  - u_category (Reference على Category)
    //  - name (اسم الساب كاتيجوري)
    var arr = [];
    var gr = new GlideRecord("u_subcategory");
    gr.addQuery("u_category", categorySysId);
    gr.orderBy("name");
    gr.query();

    while (gr.next()) {
      arr.push({
        value: gr.getUniqueValue(),     // sys_id
        label: gr.getValue("name")      // display label
      });
    }

    // 4) نرجعو JSON string (مهم: getXMLAnswer كيستقبل string)
    return JSON.stringify(arr);
  },

  type: "x_app_SubcategoryAjax"
});
