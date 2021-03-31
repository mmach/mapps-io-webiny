import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { get } from "lodash";
import invariant from "invariant";



export const getMenuBySlug = gql`
    query GetPublicMenu($slug: String!) {
        pageBuilder {
            getPublicMenu(slug: $slug) {
                data {
                    slug
                    title
                    items
                    
                },
                error {
                    code
                }
            }
        }
    }
`;

const MenuWebiny = ({ slug, component }) => {
    const Component = component
    invariant(Component, `You must provide a valid Menu component name (via "component" prop).`);

    return (
        <Query query={getMenuBySlug} variables={{ slug }}>
            {props => {
                const data = get(props, "data.pageBuilder.getPublicMenu.data", {
                    items: [],
                    title: null,
                    slug: null
                });

                return (
                    <>
                         <ps-tag data-key="pb-menu" data-value={slug} />
                         <Component {...props} data={data} />
                    </>
                );
            }}
        </Query>
    );
};

export default MenuWebiny;