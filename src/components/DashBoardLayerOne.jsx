import React from 'react'
import SalesStatisticOne from './child/SalesStatisticOne';
import TotalSubscriberOne from './child/TotalSubscriberOne';
import UsersOverviewOne from './child/UsersOverviewOne';
import UnitCountOne from './child/UnitCountOne';

const DashBoardLayerOne = () => {

    return (
        <>
            {/* UnitCountOne */}
            <UnitCountOne />

            <section className="row gy-4 mt-1">

                {/* SalesStatisticOne */}
                <SalesStatisticOne />

                {/* TotalSubscriberOne */}
                <TotalSubscriberOne />

                {/* UsersOverviewOne */}
                <UsersOverviewOne />

            </section>
        </>


    )
}

export default DashBoardLayerOne