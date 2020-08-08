import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const projectName = pulumi.getProject();

// Create a VPC.
const vpc = new awsx.ec2.Vpc(`${projectName}`, {
    tags: { "Name": `${projectName}-2` },
});

// Create an AWS EKS cluster.
const cluster = new eks.Cluster(`${projectName}`, {
    vpcId: vpc.id,
    publicSubnetIds: vpc.publicSubnetIds,
    desiredCapacity: 2,
    minSize: 2,
    maxSize: 2,
    enabledClusterLogTypes: [
        "api",
        "audit",
        "authenticator",
    ],
});

// Export the cluster kubeconfig.
export const kubeconfig = cluster.kubeconfig;
