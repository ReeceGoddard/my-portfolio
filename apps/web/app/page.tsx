import { useEffect, useState } from 'react';
import { Button, Header } from 'ui';

const baseURI = 'https://api.beta.ons.gov.uk/v1';

async function getData() {
    const res = await fetch(`https://api.beta.ons.gov.uk/v1/datasets
    `);

    if (!res.ok) {
        throw new Error(`Failed to fetch data`);
    }

    return res.json();
}

async function getOtherData() {
    const res = await fetch(`https://api.beta.ons.gov.uk/v1/datasets`);
    return res.json();
}

export default async function Page() {
    const datasetsData = await getData();
    const otherData = await getOtherData();

    const [datasets, other] = await Promise.all([datasetsData, otherData]);

    function handleNextBtnClicked() {
        getData();
    }

    return (
        <>
            <Header text="Web" />
            <Button />
            {datasets.items.map(item => (
                <div>{item.id}</div>
            ))}
            <button>prev</button>
            <button onClick={handleNextBtnClicked}>next</button>
            <div>
                <pre>{JSON.stringify(datasets, null, 4)}</pre>
            </div>
        </>
    );
}
