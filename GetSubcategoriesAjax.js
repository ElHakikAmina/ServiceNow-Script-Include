var GetSubcategoriesAjax = Class.create();
GetSubcategoriesAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Méthode appelée depuis le Client Script via GlideAjax
     * Elle retourne une liste de sous-catégories au format JSON
     */
    getSubcategories: function () {

        // 1️⃣ Récupérer le paramètre envoyé depuis le client
        var categoryId = this.getParameter('sysparm_category_id');

        // 2️⃣ Tableau qui contiendra les résultats
        var result = [];

        // 3️⃣ Vérification de sécurité
        if (!categoryId) {
            return JSON.stringify(result);
        }

        // 4️⃣ Interroger la table des sous-catégories
        var gr = new GlideRecord('u_subcategory'); // table custom
        gr.addQuery('u_category', categoryId);     // relation avec la catégorie
        gr.orderBy('name');                        // tri alphabétique
        gr.query();

        // 5️⃣ Parcourir les résultats
        while (gr.next()) {
            result.push({
                value: gr.getUniqueValue(), // sys_id
                label: gr.getValue('name')  // texte affiché
            });
        }

        // 6️⃣ Retourner les données au format JSON
        return JSON.stringify(result);
    }
});
