// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
varying vec3 interpolatedNormal;

void main() {
    // Set final rendered color according to the surface normal
    // If I remove semicolon, Shader couldn't compile.
  vec3 N = normalize(interpolatedNormal);
  //gl_FragColor = vec4(N, 1.0);
  vec3 L = vec3(0.0, 0.0, -1.0);
  float i = dot(N, L);
  if (i < 0.0) {
    i = 0.0;
  }
  gl_FragColor = vec4(i,i,i,1.0);

  // all pixels are green:
  //gl_FragColor = vec4(0, 255, 0, 0);
}
