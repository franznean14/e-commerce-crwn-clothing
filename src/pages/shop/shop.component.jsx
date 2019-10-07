import React, { Component } from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import SHOP_DATA from './shop.data';



export class ShopPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            collections: SHOP_DATA
        }
    }
    
    render() {
        const { collections } = this.state;

        return (<div className='shop-page'>
                {
                    collections.map((collections) => (
                        <CollectionPreview key={collections.id} {...collections} />
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;
