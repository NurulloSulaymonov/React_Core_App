import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActuvityList } from './ActuvityList'

interface IProps {
    activities: IActivity[]
}
export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <ActuvityList activities={activities} />
                    {/* <List>
                        {
                            activities.map(
                                (activity) => (
                                    <List.Item key={activity.id}>{activity.title}</List.Item>
                                )
                            )
                        }
                    </List> */}
                </Grid.Column>
            </Grid>
        </div>
    )
}
