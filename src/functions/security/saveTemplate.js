export default async function saveTemplate(bodyTest, route, objectMolds) {
    console.log(bodyTest);
    const body = JSON.parse(bodyTest);
    console.log(body);

    for (let u = 0; u < objectMolds.length; u++) {
        if (objectMolds[u] === route) {
            return alert('nombre de template ya existente, cambialo por otro');
        }
    }
    
    
    
    try {
        const response = await fetch('/api/saveTemplateDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                templates: { 
                    [route]: body 
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
}