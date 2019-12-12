import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.action';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPagewWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
            loading: true
        }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection');
         
        // this.unsubscribeFromSnapshot = 
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap)
                this.setState({
                    loading: false
                })
            })
    }   

    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} isLoading={loading} render={(props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> )} />
                <Route exact path={`${match.path}/:collectionId`} isLoading={loading} render={(props => <CollectionPagewWithSpinner isLoading={loading} {...props} /> )} />
            </div>
        )
    }
}      

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
