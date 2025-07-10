export const validateFlow = (nodes, edges) => {
    if (nodes.length <= 1) return true;
  
    const nodeTargets = new Set(edges.map(edge => edge.source));
    const unconnected = nodes.filter(node => !nodeTargets.has(node.id));
    
    return unconnected.length <= 1;
  };
  